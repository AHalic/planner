import { CheckCircle2, CircleDashed, UserPlus } from "lucide-react";
import Button from "../../../components/Button";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { useCallback, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import ManageGuestModal from "../../../components/modals/ManageGuestModal";

interface Guest {
    id: string,
    name: string | null,
    email: string,
    isConfirmed: boolean
}

export default function GuestsList() {
    const { tripId } = useParams();
    
    const [guests, setGuests] = useState<Guest[]>([]);
    const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);

    const getGuests = useCallback(async () => {
        api.get(`/trip/${tripId}/guest`).then(response => {
            setGuests(response.data.guests || []);
        }
        ).catch(err => {
            console.error(err);

            const message = err.response?.data?.message || 'An error occurred while fetching guests.';

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
    }, [tripId]);

    useEffect(() => {
        getGuests();
    }, [getGuests]);

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">
                {guests.map((guest, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">
                                {guest.name || 'Guest ' + index}
                            </span>

                            <span className="block text-sm truncate text-zinc-400">{guest.email}</span>
                        </div>

                        {guest.isConfirmed ? (
                            <CheckCircle2 className="size-5 text-green-400 shrink-0" />
                        ) : (
                            <CircleDashed
                                className="size-5 text-zinc-400 shrink-0" 
                            />
                        )}
                    </div>
                ))}
            </div>

            <Button
                size="full"
                type="button"
                variant="secondary"
                onClick={() => setIsManageGuestsModalOpen(true)}
            >
                <UserPlus className="size-5" />
                Invite Guests
            </Button>

            {/* Manage Guests Modal */}
            {isManageGuestsModalOpen && (
                <ManageGuestModal
                    setIsModalGuestsOpen={setIsManageGuestsModalOpen}
                    onAddInvitee={getGuests}
                />
            )}
        </div>        
    )
}
