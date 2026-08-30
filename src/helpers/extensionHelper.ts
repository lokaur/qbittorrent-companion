export const isExtension =
    typeof globalThis !== 'undefined' &&
    (!!globalThis.chrome?.runtime?.id || !!globalThis.browser?.runtime?.id);
