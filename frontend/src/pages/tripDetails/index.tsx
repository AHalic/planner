import { Plus } from "lucide-react";
import { useState } from "react";
import AddActivityModal from "../../components/modals/AddActivityModal";
import UsefulLinksList from "./Lists/UsefulLinksList";
import GuestsList from "./Lists/GuestsList";
import ActivitiesList from "./Lists/ActivitiesList";
import Header from "./Header";
import Button from "../../components/Button";

export default function TripDetails() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">

            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <div className="flex gap-16 px-4">

                {/* ACTIVITY */}
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

                    {/* DAYS */}
                    <ActivitiesList />
                </div>

                <div className="w-80 space-y-6">
                    <UsefulLinksList />

                    <div className="w-full h-px bg-zinc-800"/>

                    {/* Guests */}
                    <GuestsList />
                </div>
            </div>

            {/* MODALS */}
            {isCreateActivityModalOpen && (
                <AddActivityModal
                    setIsCreateActivityModalOpen={setIsCreateActivityModalOpen}
                />
            )}
        </div>
    )
}
