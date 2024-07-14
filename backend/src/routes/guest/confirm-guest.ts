import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { ClientError } from "../../errors/client-error";
import { env } from "../../env";

/**
 * Confirms a guest's attendance on a trip.
 * 
 * **Query Parameters**
 *  - `guestId` (UUID): The ID of the guest to confirm.
 * 
 * **Responses**
 *  - `200 OK`: Guest confirmed successfully. Redirects to the trip page.
 *  - `400 Bad Request`: Invalid request data.
 * 
 * 
 * @param app - The Fastify instance.
 */
export async function confirmGuest(app: FastifyInstance) {
    
    app.withTypeProvider<ZodTypeProvider>()
        .get('/guest/:guestId/confirm', {
            schema: {
                params: z.object({
                    guestId: z.string().uuid()
                })
            }
        }, async (request, reply) => {
            const { guestId } = request.params

            const guest = await prisma.guest.findUnique({
                where: { id: guestId }
            })

            if (!guest) {
                throw new ClientError('Guest not found')
            }

            if (guest.isConfirmed) {
                return reply.redirect(`${env.WEB_BASE_URL}/trip/${guest.tripId}`)
            }

            await prisma.guest.update({
                where: { id: guestId },
                data: { isConfirmed: true }
            })
            
            return reply.redirect(`${env.WEB_BASE_URL}/trip/${guest.tripId}`)
        })
}
