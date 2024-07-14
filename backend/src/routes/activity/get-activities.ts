import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";
import { ClientError } from "../../errors/client-error";


export async function getActivities(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get('/trip/:tripId/activity', {
            schema: {
                params: z.object({
                    tripId: z.string().uuid(),
                }),
            }
        }, async (request) => {
            const { tripId } = request.params
            
            const trip = await prisma.trip.findUnique({
                where: { id: tripId },
                include: {
                    activities: {
                        orderBy: {
                            date: 'asc'
                        }
                    }
                }
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }

            const amountOfDaysInTrip = dayjs(trip.endDate).diff(dayjs(trip.startDate), 'day') + 1
            const activities = Array.from({ length: amountOfDaysInTrip }, 
                // map function
                (_, index) => {
                    const currentDate = dayjs(trip.startDate).add(index, 'day')

                    const activitiesForDay = trip.activities.filter(activity => {
                        return dayjs(activity.date).isSame(currentDate, 'day')
                    })

                    return {
                        date: currentDate.toDate(),
                        activities: activitiesForDay
                    }
                })

            return { activities }
        })
}