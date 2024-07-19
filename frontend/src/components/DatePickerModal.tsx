import { Check, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

export default function DatePickerModal({ selectedDateRangeState, setIsDatePickerOpen }: {
    selectedDateRangeState: [DateRange | undefined, Dispatch<SetStateAction<DateRange | undefined>>],
    setIsDatePickerOpen: Dispatch<SetStateAction<boolean>>
}) {
    const [selectedDateRange, setSelectedDateRange] = selectedDateRangeState

    useEffect(() => {
        // if esc key is pressed close the modal
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            setIsDatePickerOpen(false);
          }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [setIsDatePickerOpen]);
  

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-fit rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Select dates</h2>

                        <button 
                        type="button"
                        onClick={() => setIsDatePickerOpen(false)}
                        className="text-zinc-400"
                        >
                            {selectedDateRange && selectedDateRange.from && selectedDateRange.to ? 
                                <Check className="size-5 text-zinc-400 hover:text-zinc-300"/>
                            :
                                <X className="size-5 text-zinc-400 hover:text-zinc-300"/>
                            }
                        </button>
                    </div>
                </div>

                <DayPicker
                    mode="range" 
                    selected={selectedDateRange} 
                    onSelect={setSelectedDateRange}
                    // Style defined in index.css
                />
            </div>
        </div>
    )
}
