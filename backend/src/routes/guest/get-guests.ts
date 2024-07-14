import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";


/**
 * Retrieves all guests for a specific trip.
 * 
 * **Query Parameters**
 *  - `tripId` (UUID): The ID of the trip.
 * 
 * **Request Body**
 *  - `name` string: Activity's name. Must be at least 3 characters long.
 *  - `date` Date: The date of the activity. Must be a valid date string.
 * 
 * **Responses**
 *  - `200 OK`: Guests retrieved successfully. Returns an array of guest objects.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function getGuests(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get('/trip/:tripId/guest', {
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
                    guests: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            isConfirmed: true,
                        }
                    }
                }
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }


            return { guests: trip.guests }
        })
}
