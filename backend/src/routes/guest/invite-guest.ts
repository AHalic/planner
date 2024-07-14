import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";
import nodemailer from "nodemailer";
import getMailClient from "../../lib/mailer";
import { ClientError } from "../../errors/client-error";
import { env } from "../../env";


/**
 * Invites a guest to a trip, sending an email with a confirmation link.
 * 
 * **Query Parameters**
 *  - `tripId` (UUID): The ID of the trip to which the guest will be invited.
 * 
 * **Request Body**
 *  - `email` string: Guest's email. Must be a valid email address.
 * 
 * **Responses**
 *  - `200 OK`: Guest added to the trip and email sent successfully. Returns the guest object.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function inviteGuest(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .post('/trip/:tripId/guest', {
            schema: {
                params: z.object({
                    tripId: z.string().uuid(),
                }),
                body: z.object({
                    email: z.string().email(),
                })
            }
        }, async (request) => {
            const { email } = request.body
            const { tripId } = request.params
            
            const trip = await prisma.trip.findUnique({
                where: { id: tripId }
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }

            const guest = await prisma.guest.create({
                data: {
                    email,
                    trip: {
                        connect: {
                            id: trip.id
                        }
                    },
                }
            })


            const formattedStartDate = dayjs(trip.startDate).format('MMMM DD, YYYY')
            const formattedEndDate = dayjs(trip.endDate).format('MMMM DD, YYYY')

            
            // Send an email to the owner
            const mail = await getMailClient()  
            
            const confirmationUrl = `${env.API_BASE_URL}/guest/${guest.id}/confirm`

            const message = await mail.sendMail({
                from: {
                    name: 'Trip Planner Team',
                    address: 'no-reply@plann.er'
                },
                to: guest.email,
                subject: 'Confirm your attendance on the trip to ' + trip.destination,
                html: `
                    <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                        <p>You have been invited to participate in a trip to <strong>${trip.destination}</strong> on the dates of <strong>${formattedStartDate} to ${formattedEndDate}</strong>.</p>
                        <p></p>
                        <p>To confirm your presence on the trip, click on the link below:</p>
                        <p></p>
                        <p>
                            <a href="${confirmationUrl}">Confirm Attendance</a>
                        </p>
                        
                        <p>If you are unaware of the purpose of this email or will not be able to attend, simply ignore this email.</p>
                    </div>

                `.trim()
            })

            console.log(nodemailer.getTestMessageUrl(message))

            return { id: guest.id }
        })
}
