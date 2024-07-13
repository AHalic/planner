import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Button from "../../components/Button";

export default function InputTripDetails({isGuestsOpenState}: {
    isGuestsOpenState: [boolean, Dispatch<SetStateAction<boolean>>]
}) {
    const [isGuestsOpen, setIsGuestsOpen] = isGuestsOpenState

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-4">
            
        <div className="flex items-center gap-2 flex-grow">
          <MapPin className="size-5 text-zinc-400" />
          <input 
            disabled={isGuestsOpen}
            className="bg-transparent text-lg placeholder-zinc-400 flex-grow outline-none"
            type="text" placeholder="Where do you want to go?"
          />
        </div>

        {/* TODO: fazer componente generico */}
        <div className="flex items-center gap-2 ">
          <Calendar className="size-5 text-zinc-400" />
          <input
            disabled={isGuestsOpen}
            className="bg-transparent text-lg placeholder-zinc-400 w-32 outline-none"
            type="text" placeholder="When?" 
          />
        </div>

        {/* DIVIDER */}
        <div className="w-px h-6 bg-zinc-800" />

        {isGuestsOpen ? (
          <Button 
            onClick={() => setIsGuestsOpen(false)}
            variant="secondary"
            type="button"
            >
              Change location/date
              <Settings2 className="size-5" />
          </Button>              
        ) : (
          <Button
            type="button"
            onClick={() => setIsGuestsOpen(true)}
            >
            Continue

            <ArrowRight className="size-5" />
          </Button>
        )}

      </div>
    )
}
