import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function confirmTrip(app: FastifyInstance) {
    
    app.withTypeProvider<ZodTypeProvider>()
        .get('/trip/:tripId/confirm', {
            schema: {
                params: z.object({
                    tripId: z.string().uuid(),
                })
            }
        }, async (request) => {
            const { tripId } = request.params

            return { tripId }
        })
}
