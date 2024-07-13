import { MapPin, Calendar, Settings2 } from "lucide-react";
import Button from "../../components/Button";

export default function Header() {
    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-100">Florianópolis, Brazil</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-100">August 17th to 23rd</span>
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
