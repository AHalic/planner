import { AtSign, Plus, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import Button from "../Button";

export default function InviteGuestsModal({invitees, setIsModalGuestsOpen, addInvitee, removeInvitee}: {
    invitees: string[],
    setIsModalGuestsOpen: Dispatch<SetStateAction<boolean>>,
    addInvitee: (e: FormEvent<HTMLFormElement>) => void,
    removeInvitee: (email: string) => void
}) {
  useEffect(() => {
    // if esc key is pressed close the modal
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalGuestsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsModalGuestsOpen]);


    return (
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

          {/* DIVIDER */}
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

            <Button 
              type="submit"
              >
              Invite
              <Plus className="size-5" />
            </Button>
          </form>
        </div>
      </div>
    )
}
