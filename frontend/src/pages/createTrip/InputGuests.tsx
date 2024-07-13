import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Button from "../../components/Button";

export default function InputGuests({invitees, setIsModalGuestsOpen, setIsModalConfirmOpen}: {
    invitees: string[],
    setIsModalGuestsOpen: Dispatch<SetStateAction<boolean>>,
    setIsModalConfirmOpen: Dispatch<SetStateAction<boolean>>,
}) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-4">
                
        <button
          type="button"
          onClick={() => setIsModalGuestsOpen(true)}
          className="flex items-center gap-2 flex-grow text-start"
          >
            <UserRoundPlus className="size-5 text-zinc-400" />

            {invitees.length === 0 ? (
              <span 
                className="text-lg text-zinc-400 flex-grow"
                >
                  Who will be on the trip?
              </span>
            ) : (
              <span className="text-zinc-100 flex-grow text-lg">
                {invitees.length} {invitees.length === 1 ? 'guest' : 'guests'} invited
              </span>
            )}
        </button>

        <Button
          type="button"
          onClick={() => setIsModalConfirmOpen(true)}
          >
          Confirm Trip

          <ArrowRight className="size-5" />
        </Button>

      </div>
    )
}
