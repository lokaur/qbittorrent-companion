import type Browser from 'webextension-polyfill';
import { browserApiMock } from './browserApi.mock';
import { isExtension } from '../helpers/extensionHelper';

let browserApi: typeof Browser;

if (isExtension) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    browserApi = require('webextension-polyfill');
} else {
    console.warn('[Extension Adapter]: Running in WEB MOCK mode.');
    browserApi = browserApiMock;
}

export const isFirefox = typeof browserApi.runtime.getBrowserInfo === 'function'
export { browserApi };
export type BrowserAPI = typeof Browser;
