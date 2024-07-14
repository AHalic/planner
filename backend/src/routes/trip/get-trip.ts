import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";


/**
 * Retrieves a specific trip and it's details.
 * 
 * **Query Parameters**
 *  - `tripId` (UUID): The ID of the trip.
 * 
 * **Responses**
 *  - `200 OK`: Trip retrieved successfully. Returns the trip object.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function getTrip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get('/trip/:tripId', {
            schema: {
                params: z.object({
                    tripId: z.string().uuid(),
                }),
            }
        }, async (request) => {
            const { tripId } = request.params
            
            const trip = await prisma.trip.findUnique({
                where: { id: tripId },
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }

            return { trip }
        })
}
