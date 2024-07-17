import { AtSign, Plus, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import Button from "../Button";
import { Bounce, toast } from "react-toastify";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

export default function ManageGuestModal({ setIsModalGuestsOpen, onAddInvitee }: {
    setIsModalGuestsOpen: Dispatch<SetStateAction<boolean>>,
    onAddInvitee: () => Promise<void>
}) {
    const { tripId } = useParams()

    const [loading, setLoading] = useState(false)

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


    const addInvitee = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        const email = data.get('email') as string

        if (!email) {
            console.error('Invalid form data')

            toast.error('Fill the e-mail input', {
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

        setLoading(true)

        api.post(`/trip/${tripId}/guest`, {
            email
        }).then(() => {
            setIsModalGuestsOpen(false)
            
            onAddInvitee()
            setLoading(false)

            toast.success("A confirmation email was sent to the new guest", {
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
        }).catch(err => {
            console.error(err)
            setLoading(false)
            
            const message = err.response?.data?.message || 'An error occurred while adding a new guest.';

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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

            <div className="space-y-2">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Add Guest</h2>

                <button
                type="button"
                onClick={() => setIsModalGuestsOpen(false)}
                className="text-zinc-400"
                >
                    <X className="size-5 text-zinc-400"/>
                </button>
            </div>

            <p className="text-sm text-zinc-400">
                The Guest will immediately receive an email to confirm their participation in the trip.
            </p>
            </div>

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
                disabled={loading}
                >
                Invite

                {loading ? (
                    <div className="relative">
                        <div className="absolute w-4 h-4 border-t-1 border-b-2 rounded-3xl border-lime-950 animate-spin" />
                        <div className="w-4 h-4 border-2 rounded-full border-lime-700" />
                    </div>
                ) : (
                    <Plus className="size-5" />
                )}
            </Button>
            </form>
        </div>
        </div>
    )
}
