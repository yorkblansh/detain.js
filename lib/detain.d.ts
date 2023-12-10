export declare function detain<InitialValue extends unknown, ResultValue extends unknown>(props: {
    /**
     * Array of data
     */
    array: InitialValue[];
    /**
     * Delay in milliseconds
     */
    delayMs: number;
    /**
     * Each value have to be returned
     *
     * in `Promise` or not:
     * ```ts
     * Promise<EachReturnType> | EachReturnType
     * ```
     */
    each: (item: InitialValue, index: number) => Promise<ResultValue> | ResultValue;
    /**
     * On each resolved value
     */
    onEach?: (item: ResultValue) => void;
    /**
     * *coming soon*
     */
    onReject?: (reject: unknown) => void;
}): Promise<ResultValue[]>;
