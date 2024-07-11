import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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
    )
}
