import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './pages/createTrip';
import TripDetails from './pages/tripDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTrip />,
  },
  {
    path: "/trip/:tripId",
    element: <TripDetails />,
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}
