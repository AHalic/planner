import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";


/**
 * Adds a new important/useful link to the trip resources.
 * 
 * **Query Parameters**
 *  - `tripId` (UUID): The ID of the trip.
 * 
 * **Request Body**
 *  - `name` string: Link's name. Must be at least 3 characters long.
 *  - `url` string: Link's URL. Must be a valid URL.
 * 
 * **Responses**
 *  - `200 OK`: Link created and successfully connected to the trip. Returns the link object.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function createLink(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .post('/trip/:tripId/link', {
            schema: {
                params: z.object({
                    tripId: z.string().uuid(),
                }),
                body: z.object({
                    name: z.string().min(3),
                    url: z.string().url(),
                })
            }
        }, async (request) => {
            const { name, url } = request.body
            const { tripId } = request.params
            
            const trip = await prisma.trip.findUnique({
                where: { id: tripId }
            })

            if (!trip) {
                throw new ClientError('Trip not found')
            }

            const link = await prisma.link.create({
                data: {
                    name,
                    url,
                    trip: {
                        connect: { id: tripId }
                    }
                }
            })

            return { id: link.id }
        })
}
