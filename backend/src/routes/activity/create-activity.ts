import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";
import { ClientError } from "../../errors/client-error";

/**
 * Creates a new activity, and add it to a trip.
 * 
 * **Query Parameters**
 *  - `tripId` (UUID): The ID of the trip to which the activity will be added.
 * 
 * **Request Body**
 *  - `name` string: Activity's name. Must be at least 3 characters long.
 *  - `date` Date: The date of the activity. Must be a valid date string.
 * 
 * **Responses**
 *  - `200 OK`: Activity created successfully. Returns the created activity object.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function createActivity(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .post('/trip/:tripId/activity', {
            schema: {
                params: z.object({
                    tripId: z.string().uuid(),
                }),
                body: z.object({
                    name: z.string().min(3),
                    date: z.coerce.date(),
                })
            }
        }, async (request) => {
            const { name, date } = request.body
            const { tripId } = request.params
            
            const trip = await prisma.trip.findUnique({
                where: { id: tripId }
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }

            if (dayjs(date).isBefore(trip.startDate) || dayjs(date).isAfter(trip.endDate)) {
                throw new ClientError('The activity must occur within the trip dates')
            }

            const activity = await prisma.activity.create({
                data: {
                    name,
                    date,
                    trip: {
                        connect: { id: tripId }
                    }
                }
            })

            return { id: activity.id }
        })
}
