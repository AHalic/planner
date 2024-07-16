import { CircleCheck, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { format } from "date-fns";
import { Bounce, toast } from "react-toastify";
import Button from "../../../components/Button";
import AddActivityModal from "../../../components/modals/AddActivityModal";


interface Activity {
    id: string,
    name: string,
    date: string,
    tripId: string,
}
interface Activities {
    date: string,
    activities: Activity[]
}

export default function ActivitiesList() {
    const { tripId } = useParams();

    const [activities, setActivities] = useState<Activities[]>([]);
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

    const getActivities = useCallback(async () => {
        api.get(`/trip/${tripId}/activity`).then(response => {
            setActivities(response.data.activities || []);
        }
        ).catch(err => {
            console.error(err);
    
            const message = err.response?.data?.message || 'An error occurred while fetching activities.';
    
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
        getActivities();
    }, [getActivities]);


    return (
        <div className="grow space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold">
                    Activities
                </h2>

                <Button
                    type="button"
                    onClick={() => setIsCreateActivityModalOpen(true)}
                >
                    <Plus className="size-5" />
                    New Activity
                </Button>
            </div>

            <div className="space-y-8">
                {activities.map((day, index) => (
                    <div key={index} className="space-y-2.5">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold"> Day {format(day.date, 'd')} </span>
                            <span className="text-xs text-zinc-500"> {format(day.date, 'EEEE')} </span>
                        </div>

                        {day.activities.length > 0 ? (
                            <>
                                {day.activities.map((activity) => (
                                    <div key={activity.id} className="space-y-2.5">
                                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <CircleCheck className="size-5 text-lime-400" />
                                                <span className="text-zinc-100">
                                                    {activity.name} 
                                                </span>
                                            </div>

                                            <span className="text-zinc-400 text-sm">
                                                {format(activity.date, 'HH:mm')}h
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="text-zinc-500 text-sm">No activities scheduled for this date.</p>
                        )}
                    </div>
                ))}
            </div>

            {/* MODAL ADD */}
            {isCreateActivityModalOpen && (
                <AddActivityModal
                    onAddActivity={getActivities}
                    setIsCreateActivityModalOpen={setIsCreateActivityModalOpen}
                />
            )}
        </div>
    )
}
