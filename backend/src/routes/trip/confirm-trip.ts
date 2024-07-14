import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";
import nodemailer from "nodemailer";
import getMailClient from "../../lib/mailer";
import { ClientError } from "../../errors/client-error";
import { env } from "../../env";

export async function confirmTrip(app: FastifyInstance) {
    
    app.withTypeProvider<ZodTypeProvider>()
        .get('/trip/:tripId/confirm', {
            schema: {
                params: z.object({
                    tripId: z.string().uuid(),
                })
            }
        }, async (request, reply) => {
            const { tripId } = request.params

            const trip = await prisma.trip.findUnique({
                where: { id: tripId },
                include: { 
                    guests: {
                        where: { 
                            isOwner: false 
                        }
                    }
                }
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }

            if (trip.isConfirmed) {
                return reply.redirect(`${env.WEB_BASE_URL}/trip/${tripId}`)
            }

            await prisma.trip.update({
                where: { id: tripId },
                data: { isConfirmed: true }
            })

            const formattedStartDate = dayjs(trip.startDate).format('MMMM DD, YYYY')
            const formattedEndDate = dayjs(trip.endDate).format('MMMM DD, YYYY')

            
            // Send an email to the owner
            const mail = await getMailClient()  
            
            await Promise.all([
                trip.guests.map(async (guest) => {
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
                })
            ])

            return reply.redirect(`${env.WEB_BASE_URL}/trip/${tripId}`)
        })
}
