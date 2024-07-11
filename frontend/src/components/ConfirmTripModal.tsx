import { AtSign, User, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction } from "react";

export default function ConfirmTripModal({setIsModalConfirmOpen, confirmTrip}: {
    setIsModalConfirmOpen: Dispatch<SetStateAction<boolean>>,
    confirmTrip: (e: FormEvent<HTMLFormElement>) => void
}) {
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
              <span className="text-zinc-100 font-semibold">Florianópolis, Brazil</span>&nbsp;
              on the dates&nbsp;
              <span className="text-zinc-100 font-semibold">August 16th to 27th, 2024</span>&nbsp;
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
              /> 
            </div>

            <div className="bg-zinc-950 flex items-center gap-2 flex-1 px-4 py-2.5 border border-zinc-800 rounded-lg">
              <AtSign className="text-zinc-400 size-5"/>

              <input 
                className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                type="email"
                name="email"
                placeholder="E-mail"
              /> 
            </div>              

            <button 
              type="submit"
              className="bg-lime-300 w-full text-lime-950 text-center rounded-lg py-2 px-5 font-medium flex items-center justify-center gap-2 hover:bg-lime-400"
              >
              Confirm trip creation
            </button>
          </form>
        </div>
      </div>
    )
}
