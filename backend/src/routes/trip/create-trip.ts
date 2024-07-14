import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";
import nodemailer from "nodemailer";
import getMailClient from "../../lib/mailer";
import { ClientError } from "../../errors/client-error";
import { env } from "../../env";

export async function createTrip(app: FastifyInstance) {
    // Use the ZodTypeProvider to validate the request body
    app.withTypeProvider<ZodTypeProvider>()
        .post('/trip', {
            schema: {
                body: z.object({
                    destination: z.string().min(4),
                    startDate: z.coerce.date(), // Coerce the input to a date
                    endDate: z.coerce.date(),
                    ownerName: z.string(),
                    ownerEmail: z.string().email(),
                    guestsEmails: z.array(z.string().email())
                })
            }
        }, async (request) => {
            const { destination, startDate, endDate, 
                ownerEmail, ownerName, guestsEmails } = request.body

            // Validate dates
            if (dayjs(startDate).isBefore(new Date())) {
                throw new ClientError('The start date must be in the future')
            }

            if (dayjs(startDate).isAfter(dayjs(endDate))) {
                throw new ClientError('The end date must be after the start date')
            }

            // Save the trip to the database
            const trip = await prisma.trip.create({
                data: {
                    destination,
                    startDate,
                    endDate,
                    guests: {
                        createMany: {
                            data: [
                                //  First, creates the trip owner
                                {
                                    name: ownerName,
                                    email: ownerEmail,
                                    isConfirmed: true,
                                    isOwner: true
                                },
                                // Then, creates the guests
                                ...guestsEmails.map(email => ({
                                    email,
                                }))
                            ]
                        }
                    }
                }
            })

            const formattedStartDate = dayjs(startDate).format('MMMM DD, YYYY')
            const formattedEndDate = dayjs(endDate).format('MMMM DD, YYYY')

            const confirmationUrl = `${env.API_BASE_URL}/trip/${trip.id}/confirm`

            // Send an email to the owner
            const mail = await getMailClient()
            const message = await mail.sendMail({
                from: {
                    name: 'Trip Planner Team',
                    address: 'no-reply@plann.er'
                },
                to: {
                    name: ownerName,
                    address: ownerEmail
                },
                subject: 'Confirm your trip to ' + destination,
                html: `
                    <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                        <p>You have created a trip to <strong>${destination}</strong> on the dates of <strong>${formattedStartDate} to ${formattedEndDate}</strong>.</p>
                        <p></p>
                        <p>To confirm your trip, click on the link below:</p>
                        <p></p>
                        <p>
                            <a href="${confirmationUrl}">Confirm Attendance</a>
                        </p>
                        
                        <p>If you are unaware of the purpose of this email or will not be able to attend, simply ignore this email.</p>
                    </div>

                `.trim()
            })

            console.log(nodemailer.getTestMessageUrl(message))

            return { id: trip.id }
        })
}
