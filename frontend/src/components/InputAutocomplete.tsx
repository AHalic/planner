/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css' 
import { useEffect } from 'react';

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY

export default function InputAutocomplete({ disabled, onChange }: {
    disabled?: boolean,
    onChange?: (value: any) => void,
}) {
    useEffect(() => {
        // updates the input and close button when the disabled prop changes
        // this is needed because the component does not have a disable attribute

        const input = document.querySelector('.geoapify-autocomplete-input') as HTMLInputElement;
        const cleanButton = document.querySelector('.geoapify-close-button');
        if (input && cleanButton) {
            if (disabled) {
                input.setAttribute('disabled', 'disabled');
                cleanButton.classList.remove('visible');
            } else {
                input.removeAttribute('disabled');

                // if input is not empty, show the clean button
                if (input.value !== '') {
                    cleanButton.classList.add('visible');
                }
            }
        } 
    }, [disabled]);

  function onPlaceSelect(value: any) {
    onChange && onChange(value?.properties?.formatted)
  }
 
  const suggestionsFilter = (suggestions: any) => {
    const availablePlaces = ["postcode", "street", "amenity"] 

    return suggestions.filter((i: any) => !availablePlaces.includes(i?.properties?.result_type))
  }
 
  return (
    <GeoapifyContext apiKey={API_KEY}>
        <GeoapifyGeocoderAutocomplete 
            placeholder="Where are you traveling to?"
            placeSelect={onPlaceSelect}
            suggestionsFilter={suggestionsFilter}
            skipIcons
        />
    </GeoapifyContext>
  )
}
