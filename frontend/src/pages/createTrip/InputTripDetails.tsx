import { ArrowRight, Calendar, Check, MapPin, Settings2, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../../components/Button";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { formatDateRange } from "../../lib/formatDate";
import InputAutocomplete from "../../components/InputAutocomplete";

export default function InputTripDetails({isGuestsOpenState, dateRangeState, destinationState}: {
    isGuestsOpenState: [boolean, Dispatch<SetStateAction<boolean>>],
    dateRangeState: [DateRange | undefined, Dispatch<SetStateAction<DateRange | undefined>>],
    destinationState: [string, Dispatch<SetStateAction<string>>],
}) {
    const [isGuestsOpen, setIsGuestsOpen] = isGuestsOpenState
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [selectedDateRange, setSelectedDateRange] = dateRangeState
    const [destination, setDestination] = destinationState
    
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

    const displayDateRange = selectedDateRange && selectedDateRange.from && selectedDateRange.to
      ? formatDateRange(selectedDateRange.from, selectedDateRange.to)
      : null

    return (
        <div className="h-16 bg-zinc-900 px-4 py-2 rounded-xl flex items-center shadow-shape gap-4">
            
        <div className="flex items-center gap-2 flex-grow">
          <MapPin className="size-5 text-zinc-400" />
          <InputAutocomplete 
            disabled={isGuestsOpen}
            onChange={setDestination}
          />
        </div>

        <button 
          onClick={() => setIsDatePickerOpen(true)}
          disabled={isGuestsOpen}
          className="flex items-center gap-2 text-zinc-400 outline-none text-left min-w-fit text-balance"
        >
          <Calendar className="size-5" />
          <span
            className={`${displayDateRange ? 'text-base' : 'text-lg'} w-32`}
          >
            {displayDateRange ||  'When?'}
          </span>
        </button>

        {/* DIVIDER */}
        <div className="w-px h-6 bg-zinc-800" />

        {isGuestsOpen ? (
          <Button 
            onClick={() => setIsGuestsOpen(false)}
            variant="secondary"
            type="button"
            >
              Change location/date
              <Settings2 className="size-5" />
          </Button>              
        ) : (
          <Button
            type="button"
            onClick={() => setIsGuestsOpen(true)}
            disabled={!selectedDateRange || !selectedDateRange.from || !selectedDateRange.to || !destination}
            title={!selectedDateRange || !selectedDateRange.from || !selectedDateRange.to || !destination ? 'Select the destination and dates' : ''}
            >
            Continue

            <ArrowRight className="size-5" />
          </Button>
        )}
        
        {/* DATE PICKER MODAL */}
        {isDatePickerOpen && (
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
        )}
      </div>
    )
}

