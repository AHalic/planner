import { MapPin, Calendar, Settings2 } from "lucide-react";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { formatDateRange } from "../../lib/formatDate";
import { Bounce, toast } from "react-toastify";
import { DateRange } from "react-day-picker";
import DatePickerModal from "../../components/DatePickerModal";


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
    const [isUpdateDateSelected, setIsUpdateDateSelected] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    useEffect(() => {
        api.get(`/trip/${tripId}`).then(response => {
            setTrip(response.data.trip);
            setDateRange({
                from: new Date(response.data.trip.startDate),
                to: new Date(response.data.trip.endDate)
            })
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

    const saveNewDate = () => {
        if (!dateRange || !dateRange.from || !dateRange.to) {
            console.error('Missing required fields')
            toast.error('Missing required fields', {
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

        api.put(`/trip/${tripId}`, {
            startDate: dateRange.from,
            endDate: dateRange.to
        }).then(() => {
            toast.success('Date updated successfully', {
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

            setIsUpdateDateSelected(false);
        }).catch(err => {
            console.error(err);

            const message = err.response?.data?.message || 'An error occurred while updating the trip.';

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
    }

    const displayDateRange = dateRange && dateRange.from && dateRange.to 
    ? formatDateRange(dateRange.from, dateRange.to)
    : null

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="size-5" />
                
                <span>
                    {trip?.destination}
                </span>
            </div>

            <div className="flex items-center gap-5">
                <button 
                    onClick={() => setIsDatePickerOpen(true)}
                    disabled={!isUpdateDateSelected}
                    className="flex items-center gap-2 text-zinc-400 outline-none text-left min-w-fit text-balance"
                >
                    <Calendar className="size-5" />
                    <span
                        className={`${displayDateRange ? 'text-base' : 'text-lg'} w-32 ${isUpdateDateSelected ? 'text-zinc-100 font-medium' : ''}`}
                    >
                        {displayDateRange ||  'When?'}
                    </span>
                </button>

                <div className="w-px h-6 bg-zinc-800" />
                
                {isUpdateDateSelected ? (
                    <Button 
                        variant="primary"
                        type="button"
                        onClick={() => saveNewDate()}
                    >
                        Save
                    </Button>
                ) : (
                    <Button 
                        variant="secondary"
                        type="button"
                        onClick={() => setIsUpdateDateSelected(true)}
                    >
                        Change date
                        <Settings2 className="size-5" />
                    </Button>
                )}
            </div>

            {isDatePickerOpen && (
                <DatePickerModal
                    selectedDateRangeState={[dateRange, setDateRange]}
                    setIsDatePickerOpen={setIsDatePickerOpen}
                />
            )}
        </div>
    )
}
