import { MapPin, Calendar, Settings2 } from "lucide-react";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { formatDateRange } from "../../lib/formatDate";
import { Bounce, toast } from "react-toastify";


interface Trip {
    id: string,
    destination: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    isConfirmed: boolean
}

export default function Header() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | undefined>();

    useEffect(() => {
        api.get(`/trip/${tripId}`).then(response => {
            setTrip(response.data.trip);
        }
        ).catch(err => {
            console.error(err);

            const message = err.response?.data?.message || 'An error occurred while fetching trip details.';

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

    const displayDateRange = trip 
    ? formatDateRange(trip.startDate, trip.endDate)
    : null

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                
                <span className="text-zinc-100">
                    {trip?.destination}
                </span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-100">
                        {displayDateRange}
                    </span>
                </div>

                <div className="w-px h-6 bg-zinc-800" />

                <Button variant="secondary">
                    Change location/date
                    <Settings2 className="size-5" />
                </Button>
            </div>
        </div>
    )
}
