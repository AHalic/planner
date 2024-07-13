import { Link2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";

export default function UsefulLinksList() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Useful Links</h2>

            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">
                            Airbnb Booking
                        </span>
                    </div>

                    <Link to="https://www.airbnb.com">
                        <Link2 
                            className="size-5 text-zinc-400 shrink-0 hover:text-zinc-300 hover:cursor-pointer" 
                        />
                    </Link>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">
                            Airbnb Booking
                        </span>
                    </div>

                    <Link to="https://www.airbnb.com">
                        <Link2 
                            className="size-5 text-zinc-400 shrink-0 hover:text-zinc-300 hover:cursor-pointer" 
                        />
                    </Link>
                </div>
            </div>

            <Button
                size="full"
                variant="secondary"
                type="button"
            >
                <Plus className="size-5" />
                Change location/date
            </Button>
        </div>
    )
}
