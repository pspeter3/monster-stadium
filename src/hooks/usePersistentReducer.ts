import { useReducer, useEffect, Reducer } from "preact/hooks";

export type Callback = () => void;

export interface PersistenceProvider {
    value(): string | null;
    setValue(value: string): void;
    onChange(callback: Callback): Callback;
}

export class QueryStringProvider implements PersistenceProvider {
    value(): string {
        return location.search;
    }
    setValue(value: string): void {
        history.replaceState(null, "", `?${value}`);
    }
    onChange(callback: Callback): Callback {
        window.addEventListener("popstate", callback);
        return () => window.removeEventListener("popstate", callback);
    }
}

export class LocalStorageProvider implements PersistenceProvider {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    value(): string | null {
        return localStorage.getItem(this.key);
    }

    setValue(value: string): void {
        localStorage.setItem(this.key, value);
    }

    onChange(callback: Callback): Callback {
        window.addEventListener("storage", callback);
        return () => window.removeEventListener("storage", callback);
    }
}

export interface Serializer<T> {
    parse(data: string): T;
    stringify(value: T): string;
}

export type PersistenceAction<T> = Readonly<{
    type: "persistence";
    value: T;
}>;

export const usePersistentReducer = <S, A>(
    reducer: Reducer<S, A | PersistenceAction<S>>,
    initialState: S,
    options: { persistence: PersistenceProvider; serializer: Serializer<S> }
): [S, (action: A) => void] => {
    const { persistence, serializer } = options;
    const ctx = useReducer(
        reducer,
        persistence.value() !== null
            ? serializer.parse(persistence.value()!)
            : initialState
    );
    const [state, dispatch] = ctx;
    useEffect(() => persistence.setValue(serializer.stringify(state)), [state]);
    useEffect(
        () =>
            persistence.onChange(() => {
                const value = persistence.value();
                if (value !== null) {
                    dispatch({
                        type: "persistence",
                        value: serializer.parse(value),
                    });
                }
            }),
        []
    );
    return ctx;
};
