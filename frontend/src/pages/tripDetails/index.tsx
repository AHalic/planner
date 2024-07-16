import UsefulLinksList from "./Lists/UsefulLinksList";
import GuestsList from "./Lists/GuestsList";
import ActivitiesList from "./Lists/ActivitiesList";
import Header from "./Header";

export default function TripDetails() {

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">

            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <div className="flex gap-16 px-4">

                {/* ACTIVITY */}
                <ActivitiesList />

                <div className="w-80 space-y-6">
                    <UsefulLinksList />

                    <div className="w-full h-px bg-zinc-800"/>

                    {/* Guests */}
                    <GuestsList />
                </div>
            </div>
        </div>
    )
}
