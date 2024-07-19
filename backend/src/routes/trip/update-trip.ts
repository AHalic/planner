import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";
import { ClientError } from "../../errors/client-error";


/**
 * Updates a trip's details.
 * 
 * **Query Parameters**
 *  - `tripId` (UUID): The ID of the trip.
 * 
 * **Request Body**
 *  - `startDate` string: The start date of the trip.
 *  - `endDate` string: The end date of the trip.
 * 
 * **Responses**
 *  - `200 OK`: Trip updated successfully. Returns the trip ID.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function updateTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .put('/trip/:tripId', {
            schema: {
                params: z.object({
                    tripId: z.string().uuid(),
                }),
                body: z.object({
                    startDate: z.coerce.date(), // Coerce the input to a date
                    endDate: z.coerce.date(),
                })
            }
        }, async (request) => {
            const { startDate, endDate } = request.body
            const { tripId } = request.params

            const trip = await prisma.trip.findUnique({
                where: { id: tripId }
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }


            // Validate dates
            if (dayjs(startDate).isBefore(new Date())) {
                throw new ClientError('The start date must be in the future')
            }

            if (dayjs(startDate).isAfter(dayjs(endDate))) {
                throw new ClientError('The end date must be after the start date')
            }
            
            await prisma.trip.update({
                data: {
                    startDate,
                    endDate,
                },
                where: { id: tripId }
            })

            return { id: trip.id }
        })
}
