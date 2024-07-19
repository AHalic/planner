# Planner
Planner is a trip planning application designed to facilitate traveling with friends. From creating itineraries to inviting your friends, Planner helps ensure your travels are well-organized.

<p align="center">
    <img alt="Demo gif" src="/frontend/public/demo.gif" width="70%"/>
</p>

## Features
Users can:
- Create a new trip by selecting the destination, dates, and inviting friends.
- Manage the trip itinerary by adding activities to each day.
- Add useful links, such as hotel reservations.
- Change the trip's dates and invite more friends.

When inviting friends, they will receive a confirmation email with a link to confirm their attendance.

## Structure
The system is divided into two servers, which are explained in this section.

For both, you must have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com) installed.

```
% node --version
20.15.0
% npm --version
10.8.1
```

### Backend

#### Running the server

After cloning this repository, navigate to the backend folder and install the essential packages with:
```bash
cd backend
npm i
```

In this directory, create a `.env` file and add the following environment variables:

```bash
DATABASE_URL # Used to connect Prisma to the database
API_BASE_URL
WEB_BASE_URL
PORT         # API port
```

Then run the following commands to generate tables in your database with prisma.
```bash
npx prisma generate
npx prisma migrate dev --name init
```

Finally run the server with:
```
npm run dev
```


#### Schema and Routes
Below is the full DB schema.
<p align="center">
    <img alt="DB Schema" src="/backend/public/db-schema.png" width="80%"/>
</p>

The API docs can be found in [prisma/docs](backend/prisma/docs/index.html), and you can import the routes to your imsonia using [insomnia-routes](backend/insomnia-routes.json).


#### Dependencies
- [Prisma](https://www.prisma.io): Next-generation ORM for Node.js and TypeScript.
- [Typescript](https://www.typescriptlang.org): TypeScript language support.
- [Dayjs](https://day.js.org/en/): A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- [Fastify](https://fastify.dev): Fast and low overhead web framework for Node.js.
- [Nodemailer](https://nodemailer.com): Module to send emails from Node.js.
- [Zod](https://zod.dev): TypeScript-first schema declaration and validation library.


### Frontend

#### Running the server

Navigate to the frontend folder and install the essential packages with:
```bash
cd frontend
npm i
```

In this directory, create a `.env` file and add the following environment variable:

```bash
VITE_GEOAPIFY_API_KEY
```

This key is necessary to use the geoapify autocomplete API, you can follow their [tutorial](https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/#quick-start) to get a key api.


Finally run the application with:
```
npm run dev
```

#### Dependencies
- [Geoapify/react-geocoder-autocomplete](https://apidocs.geoapify.com/samples/autocomplete/react-geoapify-geocoder-autocomplete/): Provides a React component that wraps geocoder autocomplete for Geoapify Geocoding API.
- [Typescript](https://www.typescriptlang.org): TypeScript language support.
- [Axios](https://axios-http.com): Promise-based HTTP client for the browser and Node.js.
- [Date-fns](https://date-fns.org): Toolset for manipulating JavaScript dates in a browser & Node.js.
- [Lucide-react](https://lucide.dev): Open-source icon library
- [React](https://react.dev): A JavaScript library for building user interfaces.
- [Tailwindcss](https://tailwindcss.com): A utility-first CSS framework for rapid UI development.
- [Vite](https://vitejs.dev): A fast build tool and development server for modern web projects.
