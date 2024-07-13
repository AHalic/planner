import { Calendar, Clock, Tag, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Button from "../Button";

export default function AddActivityModal({setIsCreateActivityModalOpen}: {
    setIsCreateActivityModalOpen: Dispatch<SetStateAction<boolean>>,
}) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Add new activity</h2>

                <button 
                    type="button"
                    onClick={() => setIsCreateActivityModalOpen(false)}
                    className="text-zinc-400"
                    >
                    <X className="size-5 text-zinc-400"/>
                </button>
                </div>

                <p className="text-sm text-zinc-400">
                    All guests can see the activities you add here.
                </p>
            </div>

            <form 
                className="space-y-4"
            >
                <div className="flex bg-zinc-950 items-center gap-2 flex-1 px-4 py-2.5 border border-zinc-800 rounded-lg">
                <Tag className="text-zinc-400 size-5"/>

                <input 
                    className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                    name="title"
                    placeholder="Activity Name"
                /> 
                </div>

                <div className="flex items-center gap-2">
                    <div className="grow bg-zinc-950 flex items-center gap-2 flex-1 px-4 py-2.5 border border-zinc-800 rounded-lg">
                        <Calendar className="text-zinc-400 size-5"/>
            
                        <input 
                            type="date"
                            className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                            placeholder="Date"
                        /> 
                    </div>          

                    <div className="bg-zinc-950 flex items-center gap-2 flex-1 px-4 py-2.5 border border-zinc-800 rounded-lg">
                        <Clock className="text-zinc-400 size-5"/>
            
                        <input 
                            className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                            placeholder="Time"
                            type="time"
                        /> 
                    </div>              
                </div>

                <Button 
                    type="submit"
                >
                    Save Activity
                </Button>
            </form>
            </div>
        </div>
    )
}
