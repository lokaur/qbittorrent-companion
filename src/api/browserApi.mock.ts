import type Browser from 'webextension-polyfill';

const mockStorage = {
    async get(keys?: string | string[] | null) {
        if (typeof keys === 'string') {
            const val = localStorage.getItem(keys);
            return { [keys]: val ? JSON.parse(val) : undefined };
        }

        return {};
    },
    async set(items: Record<string, unknown>) {
        Object.entries(items).forEach(([key, val]) => {
            localStorage.setItem(key, JSON.stringify(val));
        });
    },
    async remove(keys: string | string[]) {
        const keysArray = Array.isArray(keys) ? keys : [keys];
        keysArray.forEach(k => localStorage.removeItem(k));
    },
    clear: async () => localStorage.clear(),
};

export const browserApiMock = {
    storage: {
        local: mockStorage,
        sync: mockStorage,
    },
    tabs: {
        query: async () => [],
        sendMessage: async () => { },
    },
    runtime: {
        sendMessage: async () => { },
        onMessage: { addListener: () => { }, removeListener: () => { } },
    },
} as unknown as typeof Browser;
