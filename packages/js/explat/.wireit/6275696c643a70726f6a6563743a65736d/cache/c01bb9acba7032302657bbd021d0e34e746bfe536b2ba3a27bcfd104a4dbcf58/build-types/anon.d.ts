/**
 * Gather w.js anonymous cookie, tk_ai
 */
export declare const readAnonCookie: () => string | null;
/**
 * Initializes the anonId:
 * - Polls for AnonId receival
 * - Should only be called once at startup
 * - Happens to be safe to call multiple times if it is necessary to reset the anonId - something like this was necessary for testing.
 *
 * This purely for boot-time initialization, in usual circumstances it will be retrieved within 100-300ms, it happens in parallel booting
 * so should only delay experiment loading that much for boot-time experiments. In some circumstances such as a very slow connection this
 * can take a lot longer.
 *
 * The state of initializeAnonIdPromise should be used rather than the return of this function.
 * The return is only available to make this easier to test.
 *
 * Throws on error.
 */
export declare const initializeAnonId: () => Promise<string | null>;
export declare const getAnonId: () => Promise<string | null>;
//# sourceMappingURL=anon.d.ts.map