import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './pages/createTrip';
import TripDetails from './pages/tripDetails';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}
