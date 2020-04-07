import { useReducer, Reducer, useEffect } from "preact/hooks";

export const useStorageReducer = <S, A>(
    key: string,
    reducer: Reducer<S, A>,
    initialState: S
): [S, (action: A) => void] => {
    const ctx = useReducer(
        reducer,
        localStorage.getItem(key) !== null
            ? JSON.parse(localStorage.getItem(key)!)
            : initialState
    );
    const state = ctx[0];
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);
    return ctx;
};
