import { browserApi } from "../api/browserApi";
import type { FavoriteLocation } from "../models/FavoriteLocation";

const FAVORITE_LOCATIONS_KEY = 'favoriteLocations'

interface LocationStorage {
    favoriteLocations?: FavoriteLocation[]
}

export async function getLocations(): Promise<FavoriteLocation[]> {
    const result =
        await browserApi.storage.local.get(FAVORITE_LOCATIONS_KEY) as LocationStorage
    return result?.favoriteLocations ?? []
}

export async function saveLocation(location: FavoriteLocation): Promise<void> {
    const locations = await getLocations()
    await saveLocations([
        ...locations,
        location
    ])
}

export async function saveLocations(locations: FavoriteLocation[]): Promise<void> {
    await browserApi.storage.local.set({
        [FAVORITE_LOCATIONS_KEY]: locations
    })
}

export async function removeLocation(locationId: string): Promise<void> {
    const locations = await getLocations()
    await saveLocations(locations.filter(loc => loc.id != locationId))
}

export async function removeLocationsByServerId(serverId: string): Promise<void> {
    const locations = await getLocations()
    await saveLocations(locations.filter(loc => loc.serverId != serverId))
}
