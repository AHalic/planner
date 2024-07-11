import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import InviteGuestsModal from "../../components/InviteGuestsModal"
import ConfirmTripModal from "../../components/ConfirmTripModal"
import InputTripDetails from "./InputTripDetails"
import InputGuests from "./InputGuests"

export default function CreateTrip() {
  const [isGuestsOpen, setIsGuestsOpen] = useState(false)
  const [isModalGuestsOpen, setIsModalGuestsOpen] = useState(false)
  
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)
  
  const [invitees, setInvitees] = useState<string[]>([])

  const navigate = useNavigate()

  const addInvitee = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string

    // TODO: mostrar mensagem de erro
    if (!email) return

    if (invitees.includes(email)) return
    
    setInvitees([...invitees, email])

    // clear input
    e.currentTarget.reset()
  }

  const removeInvitee = (email: string) => {
    setInvitees(invitees.filter(invitee => invitee !== email))
  }

  const confirmTrip = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    navigate('/trip/1')
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
        />
      )}
    </div>
  )
}
