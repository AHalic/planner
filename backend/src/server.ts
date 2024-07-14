import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmGuest } from "./routes/confirm-guest";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";

const app = fastify()

app.register(cors, {
    origin: 'http://localhost:3000'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmGuest)

app.register(createActivity)
app.register(getActivities)

app.register(createLink)
app.register(getLinks)

app.listen({ port: 3333 }).then(() => {
    console.log('Server is running on port 3333')
})
