import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/trip/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/trip/confirm-trip";
import { confirmGuest } from "./routes/guest/confirm-guest";
import { createActivity } from "./routes/activity/create-activity";
import { getActivities } from "./routes/activity/get-activities";
import { createLink } from "./routes/link/create-link";
import { getLinks } from "./routes/link/get-links";
import { getGuests } from "./routes/guest/get-guests";
import { inviteGuest } from "./routes/guest/invite-guest";
import { updateTrip } from "./routes/trip/update-trip";
import { getTrip } from "./routes/trip/get-trip";
import { getUniqueGuest } from "./routes/guest/get-unique-guest";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify()

app.register(cors, {
    origin: env.WEB_BASE_URL
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.setErrorHandler(errorHandler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmGuest)
app.register(updateTrip)
app.register(getTrip)

app.register(createActivity)
app.register(getActivities)

app.register(createLink)
app.register(getLinks)

app.register(getGuests)
app.register(inviteGuest)
app.register(getUniqueGuest)

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server is running on port ${env.PORT}`)
})
