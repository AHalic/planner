import { CircleDashed, UserCog } from "lucide-react";
import Button from "../../../components/Button";

export default function GuestsList() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">
                            Sophie
                        </span>

                        <span className="block text-sm truncate text-zinc-400">sophie@email.com</span>
                    </div>


                    <CircleDashed
                        className="size-5 text-zinc-400 shrink-0 hover:text-zinc-300 hover:cursor-pointer" 
                    />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">
                            Sophie
                        </span>
                        
                        <span className="block text-sm truncate text-zinc-400">sophie@email.com</span>
                    </div>

                    <CircleDashed 
                        className="size-5 text-zinc-400 shrink-0 hover:text-zinc-300 hover:cursor-pointer" 
                    />
                </div>
            </div>

            <Button
                size="full"
                type="button"
                variant="secondary"
            >
                <UserCog className="size-5" />
                Manage Guests
            </Button>
        </div>        
    )
}
