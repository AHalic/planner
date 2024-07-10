import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from "lucide-react"
import { FormEvent, useState } from "react"

export function App() {
  const [isGuestsOpen, setIsGuestsOpen] = useState(false)
  const [isModalGuestsOpen, setIsModalGuestsOpen] = useState(false)
  const [invitees, setInvitees] = useState<string[]>([])

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
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-4">
            
            <div className="flex items-center gap-2 flex-grow">
              <MapPin className="size-5 text-zinc-400" />
              <input 
                disabled={isGuestsOpen}
                className="bg-transparent text-lg placeholder-zinc-400 flex-grow outline-none"
                type="text" placeholder="Where do you want to go?"
              />
            </div>

            <div className="flex items-center gap-2 ">
              <Calendar className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsOpen}
                className="bg-transparent text-lg placeholder-zinc-400 w-32 outline-none"
                type="text" placeholder="When?" 
              />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsOpen ? (
              <button 
                onClick={() => setIsGuestsOpen(false)}
                className="max-w-full min-w-fit bg-zinc-800 text-zinc-200 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-zinc-700 flex-no-wrap overflow-hidden"
                type="button"
                >
                  Change location/date
                  <Settings2 className="size-5" />
              </button>              
            ) : (
              <button 
                className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                type="button"
                onClick={() => setIsGuestsOpen(true)}
                >
                Continue

                <ArrowRight className="size-5" />
              </button>
            )}

          </div>

          {isGuestsOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-4">
                
              <button
                type="button"
                onClick={() => setIsModalGuestsOpen(true)}
                className="flex items-center gap-2 flex-grow text-start"
                >
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  <span 
                    className="text-lg text-zinc-400 flex-grow"
                    >
                      Who will be on the trip?
                  </span>
              </button>

              <button 
                className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                type="button"
                >
                Confirm Trip

                <ArrowRight className="size-5" />
              </button>

            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          By planning your trip with <i>planner</i>, you automatically agree <br />
          to our <a href="#" className="text-zinc-300 underline">terms of use</a>
          &nbsp; and &nbsp;
          <a href="#" className="text-zinc-300 underline">privacy policies</a>.
        </p>
      </div>


      {/* MODAL */}
      {isModalGuestsOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Select Guests</h2>

                <button 
                  type="button"
                  onClick={() => setIsModalGuestsOpen(false)}
                  className="text-zinc-400"
                  >
                    <X className="size-5 text-zinc-400"/>
                </button>
              </div>

              <p className="text-sm text-zinc-400">
                Guests will receive an email to confirm their participation in the trip.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">

              {invitees.map((invitee, index) => (  
                <div key={index} 
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                >
                  <span className="text-zinc-300">{invitee}</span>

                  <button 
                    onClick={() => removeInvitee(invitee)}
                    type="button"
                  >
                    <X className="size-5 text-zinc-300"/>
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-zinc-800"/>

            <form 
              onSubmit={addInvitee}
              className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
            >
              <div className="flex items-center gap-2 px-2 flex-1">
                <AtSign className="text-zinc-400 size-5"/>

                <input 
                  className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                  type="email"
                  name="email"
                  placeholder="Enter guest's email"
                /> 
              </div>

              <button 
                type="submit"
                className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400"
                >
                Invite
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
