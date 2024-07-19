import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import InviteGuestsModal from "../../components/modals/InviteGuestsModal"
import ConfirmTripModal from "../../components/modals/ConfirmTripModal"
import InputTripDetails from "./InputTripDetails"
import InputGuests from "./InputGuests"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"
import { Bounce, toast } from "react-toastify"

export default function CreateTrip() {
  const [isGuestsOpen, setIsGuestsOpen] = useState(false)
  const [isModalGuestsOpen, setIsModalGuestsOpen] = useState(false)
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)

  const [destination, setDestination] = useState<string>('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [ownerName, setOwnerName] = useState<string>('')
  const [ownerEmail, setOwnerEmail] = useState<string>('')
  
  const [invitees, setInvitees] = useState<string[]>([])

  const navigate = useNavigate()

  const addInvitee = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string

    if (!email) {
      toast.error("E-mail required", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
      });

      return
    }

    if (invitees.includes(email)) {
      toast.error("E-mail already added", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
      });

      return
    }
    
    setInvitees([...invitees, email])

    // clear input
    e.currentTarget.reset()
  }

  const removeInvitee = (email: string) => {
    setInvitees(invitees.filter(invitee => invitee !== email))
  }

  const confirmTrip = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!destination || 
        !dateRange || !dateRange.from || !dateRange.to || 
        !ownerName || !ownerEmail || 
        invitees.length === 0) {

      console.error('Missing required fields')
      toast.error('Missing required fields', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
      });

      return
    }

    api.post('/trip', {
      destination,
      startDate: dateRange?.from,
      endDate: dateRange?.to,
      ownerName,
      ownerEmail,
      guestsEmails: invitees
    }).then((response) => {
      navigate(`/trip/${response.data.id}`)
    }).catch(err => {
      console.error(err)

      const message = err.response?.data?.message || 'An error occurred while creating the trip.';

      toast.error(message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
      });
    })
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className="flex flex-col gap-3 items-center">
          <img src="/logo.svg" alt="Planner logo" />

          <p className="text-lg text-zinc-300">
            Invite your friends and plan your next trip!
          </p>
        </div>

        <div className="space-y-4">
            <InputTripDetails
                isGuestsOpenState={[isGuestsOpen, setIsGuestsOpen]}
                dateRangeState={[dateRange, setDateRange]}
                destinationState={[destination, setDestination]}
            />

          {isGuestsOpen && (
            <InputGuests
                invitees={invitees}
                setIsModalGuestsOpen={setIsModalGuestsOpen}
                setIsModalConfirmOpen={setIsModalConfirmOpen}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          By planning your trip with <i>planner</i>, you automatically agree <br />
          to our <a href="#" className="text-zinc-300 underline">terms of use</a>
          &nbsp; and &nbsp;
          <a href="#" className="text-zinc-300 underline">privacy policies</a>.
        </p>
      </div>


      {/* GUESTS SELECTION MODAL */}
      {isModalGuestsOpen && (
        <InviteGuestsModal
            invitees={invitees}
            addInvitee={addInvitee}
            removeInvitee={removeInvitee}
            setIsModalGuestsOpen={setIsModalGuestsOpen}
        />
      )}

      {/* CONFIRMATION MODAL */}
      {isModalConfirmOpen && (
        <ConfirmTripModal
            confirmTrip={confirmTrip}
            setIsModalConfirmOpen={setIsModalConfirmOpen}
            ownerState={[ownerName, setOwnerName]}
            ownerEmailState={[ownerEmail, setOwnerEmail]}
            destination={destination}
            date={dateRange}
        />
      )}
    </div>
  )
}
