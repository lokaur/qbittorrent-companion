export function isExtension(): boolean {
    return typeof chrome !== 'undefined'
        && chrome.storage !== undefined
}

export async function setValue<T>(key: string, value: T): Promise<void> {
    if (isExtension()) {
        await chrome.storage.local.set({
            [key]: value
        })
    } else {
        localStorage.setItem(key, typeof value === "string"
            ? value
            : JSON.stringify(value)
        )
    }
}
