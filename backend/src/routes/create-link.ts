import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

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
                throw new Error('Trip not found')
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
