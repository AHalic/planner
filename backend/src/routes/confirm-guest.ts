import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

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
                throw new Error('Guest not found')
            }

            if (guest.isConfirmed) {
                return reply.redirect(`http://localhost:3000/trip/${guest.tripId}`)
            }

            await prisma.guest.update({
                where: { id: guestId },
                data: { isConfirmed: true }
            })
            
            return reply.redirect(`http://localhost:3000/trip/${guest.tripId}`)
        })
}
