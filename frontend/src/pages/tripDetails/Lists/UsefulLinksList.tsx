import { Link2, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { Bounce, toast } from "react-toastify";
import AddLinkModal from "../../../components/modals/AddLinkModal";


interface Link {
    id: string,
    name: string,
    url: string,
    tripId: string,
}

export default function UsefulLinksList() {
    const { tripId } = useParams();

    const [links, setLinks] = useState<Link[]>([]);
    const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);

    const getLinks = useCallback(async () => {
        api.get(`/trip/${tripId}/link`).then(response => {
            setLinks(response.data.links || []);
        }
        ).catch(err => {
            console.error(err);
    
            const message = err.response?.data?.message || 'An error occurred while fetching links.';
    
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
        });
    }, [tripId])

    useEffect(() => {
        getLinks();
    }, [getLinks]);


    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Useful Links</h2>

            <div className="space-y-5">
                {links.length > 0 ? (
                    links.map((link) => (                        
                        <div key={link.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">
                                    {link.name}
                                </span>
                            </div>

                            <Link to={link.url}>
                                <Link2 
                                    className="size-5 text-zinc-400 shrink-0 hover:text-zinc-300 hover:cursor-pointer" 
                                />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-zinc-300">No links added yet</p>
                )}
            </div>

            <Button
                size="full"
                variant="secondary"
                type="button"
                onClick={() => setIsAddLinkModalOpen(true)}
            >
                <Plus className="size-5" />
                Add new link
            </Button>

            {isAddLinkModalOpen && (
                <AddLinkModal
                    setIsAddLinkModalOpen={setIsAddLinkModalOpen}
                    onAddLink={getLinks}
                />
            )}
        </div>
    )
}
