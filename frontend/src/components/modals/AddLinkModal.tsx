import { Link2, Tag, X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import Button from "../Button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function AddLinkModal({ setIsAddLinkModalOpen, onAddLink }: {
    setIsAddLinkModalOpen: Dispatch<SetStateAction<boolean>>,
    onAddLink: () => Promise<void>
}) {
    const { tripId } = useParams()

    useEffect(() => {
        // if esc key is pressed close the modal
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            setIsAddLinkModalOpen(false);
          }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [setIsAddLinkModalOpen]);

    const addLink = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        const name = data.get('name') as string
        const url = data.get('url') as string

        if (!name || !url) {
            console.error('Invalid form data')
            toast.error('Invalid form data', {
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

        api.post(`/trip/${tripId}/link`, {
            name,
            url
        }).then(() => {
            setIsAddLinkModalOpen(false)
            
            onAddLink()
        }).catch(err => {
            console.error(err)

            const message = err.response?.data?.message || 'An error occurred while adding the link.';

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
                <h2 className="text-lg font-semibold">Add new link</h2>

                <button 
                    type="button"
                    onClick={() => setIsAddLinkModalOpen(false)}
                    className="text-zinc-400"
                    >
                    <X className="size-5 text-zinc-400"/>
                </button>
                </div>

                <p className="text-sm text-zinc-400">
                    All guests can see the links you add here.
                </p>
            </div>

            <form 
                className="space-y-4"
                onSubmit={addLink}
            >
                <div className="flex bg-zinc-950 items-center gap-2 flex-1 px-4 py-2.5 border border-zinc-800 rounded-lg">
                    <Tag className="text-zinc-400 size-5"/>

                    <input 
                        className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                        name="name"
                        placeholder="Link title"
                    /> 
                </div>

                <div className="flex bg-zinc-950 items-center gap-2 flex-1 px-4 py-2.5 border border-zinc-800 rounded-lg">
                    <Link2 className="text-zinc-400 size-5"/>

                    <input 
                        className="bg-zinc-950 autofill:bg-zinc-950 text-lg placeholder-zinc-400 flex-1 outline-none"
                        name="url"
                        placeholder="URL"
                        type="url"
                    /> 
                </div>

                <Button 
                    type="submit"
                    size="full"
                >
                    Save Link
                </Button>
            </form>
            </div>
        </div>
    )
}
