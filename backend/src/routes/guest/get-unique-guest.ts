import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";


/**
 * Retrieves a specific guest.
 * 
 * **Query Parameters**
 *  - `guestId` (UUID): The ID of the guest.
 * 
 * **Responses**
 *  - `200 OK`: Guest retrieved successfully. Returns the guest object.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function getUniqueGuest(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get('/guest/:guestId', {
            schema: {
                params: z.object({
                    guestId: z.string().uuid(),
                }),
            }
        }, async (request) => {
            const { guestId } = request.params
            
            const guest = await prisma.guest.findUnique({
                where: { id: guestId }
            })

            if (!guest) {
                throw new ClientError('Guest not found')
            }

            return { guest }
        })
}
