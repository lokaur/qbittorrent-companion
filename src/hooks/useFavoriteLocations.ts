import { useEffect, useState } from "react";
import type { FavoriteLocation } from "../models/FavoriteLocation";
import { getLocations, removeLocation, saveLocation } from "../storage/locationStore";

export function useFavoriteLocations() {
    const [locations, setLocations] = useState<FavoriteLocation[]>([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadLocations()
    }, [])

    async function loadLocations() {
        try {
            setLoading(true)
            const storedLocations = await getLocations()
            setLocations(storedLocations)
        } finally {
            setLoading(false)
        }
    }

    async function addLocation(location: FavoriteLocation) {
        await saveLocation(location)
        setLocations(current => [
            ...current,
            location
        ])
    }

    async function deleteLocation(locationId: string) {
        await removeLocation(locationId)
        setLocations(current => current.filter(loc => loc.id != locationId))
    }

    return {
        locations,
        loading,
        loadLocations,
        addLocation,
        deleteLocation
    }
}
