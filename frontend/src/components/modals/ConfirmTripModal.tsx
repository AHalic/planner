import { AtSign, User, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import Button from "../Button";
import { DateRange } from "react-day-picker";
import { formatDateRange } from "../../lib/formatDate";

export default function ConfirmTripModal({ setIsModalConfirmOpen, confirmTrip, ownerState, ownerEmailState, destination, date }: {
    setIsModalConfirmOpen: Dispatch<SetStateAction<boolean>>,
    confirmTrip: (e: FormEvent<HTMLFormElement>) => void,
    ownerState: [string, Dispatch<SetStateAction<string>>],
    ownerEmailState: [string, Dispatch<SetStateAction<string>>],
    destination: string,
    date: DateRange | undefined
}) {
  const [owner, setOwner] = ownerState
  const [ownerEmail, setOwnerEmail] = ownerEmailState

  useEffect(() => {
    // if esc key is pressed close the modal
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalConfirmOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsModalConfirmOpen]);

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Confirm trip</h2>

              <button 
                type="button"
                onClick={() => setIsModalConfirmOpen(false)}
                className="text-zinc-400"
                >
                  <X className="size-5 text-zinc-400"/>
              </button>
            </div>

            <p className="text-sm text-zinc-400">
              To complete the creation of the trip to&nbsp;
              <span className="text-zinc-100 font-semibold">
                  {destination}
              </span>&nbsp;
              on the dates&nbsp;
              <span className="text-zinc-100 font-semibold">
                {
                  date && date.from && date.to 
                  ? formatDateRange(date.from, date.to)
                  : null
                }
              </span>&nbsp;
              fill in your details below:
            </p>
          </div>

          <form 
            onSubmit={confirmTrip}
            className="space-y-4"
          >
            <div className="flex bg-zinc-950 items-center gap-2 flex-1 px-4 py-2.5 border border-zinc-800 rounded-lg">
              <User className="text-zinc-400 size-5"/>

              <input 
                className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                type="text"
                name="name"
                placeholder="Full name"
                onChange={(e) => setOwner(e.target.value)}
              /> 
            </div>

            <div className="bg-zinc-950 flex items-center gap-2 flex-1 px-4 py-2.5 border border-zinc-800 rounded-lg">
              <AtSign className="text-zinc-400 size-5"/>

              <input 
                className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={(e) => setOwnerEmail(e.target.value)}
              /> 
            </div>              

            <Button
              size="full"
              type="submit"
              disabled={owner === '' || ownerEmail === ''}
              >
              Confirm trip creation
            </Button>
          </form>
        </div>
      </div>
    )
}
