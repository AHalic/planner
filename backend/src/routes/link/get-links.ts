import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";


/**
 * Retrieves all important/useful links for a trip.
 * 
 * **Query Parameters**
 *  - `tripId` (UUID): The ID of the trip.
 * 
 * **Responses**
 *  - `200 OK`: Links retrieved successfully. Returns the list of links.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function getLinks(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get('/trip/:tripId/link', {
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
                    links: true
                }
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }

            return { links: trip.links }
        })
}
