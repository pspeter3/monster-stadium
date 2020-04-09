import { h, FunctionComponent, Fragment } from "preact";
import { render, fireEvent, act, cleanup } from "@testing-library/preact";
import {
    QueryStringProvider,
    LocalStorageProvider,
    PersistenceProvider,
    usePersistentReducer,
    Callback,
    PersistenceAction,
} from "./usePersistentReducer";

const Test: FunctionComponent<{
    initial: string;
    persistence: PersistenceProvider;
}> = ({ initial, persistence }) => {
    const [state, dispatch] = usePersistentReducer(
        (_: string, action: PersistenceAction<string>) => action.value,
        initial,
        { persistence, serializer: JSON }
    );
    return (
        <Fragment>
            <pre data-testid="state">{state}</pre>
            <input
                aria-label="dispatch"
                onInput={(event) =>
                    dispatch({
                        type: "persistence",
                        value: (event.target as HTMLInputElement).value,
                    })
                }
            />
        </Fragment>
    );
};

describe("usePersistentReducer", () => {
    describe("QueryStringProvider", () => {
        afterEach(() => {
            history.replaceState(null, "", "");
        });

        it("should return the query string", () => {
            const provider = new QueryStringProvider();
            const search = "?test=true";
            history.replaceState(null, "", search);
            expect(provider.value()).toStrictEqual(search);
        });

        it("should set the query string", () => {
            const provider = new QueryStringProvider();
            const search = "test=true";
            provider.setValue(search);
            expect(location.search).toStrictEqual(`?${search}`);
        });

        it("should handle events", () => {
            const provider = new QueryStringProvider();
            const callback = jest.fn();
            window.addEventListener = jest.fn();
            window.removeEventListener = jest.fn();
            const cleanup = provider.onChange(callback);
            expect(window.addEventListener).toHaveBeenCalledWith(
                "popstate",
                callback
            );
            expect(window.removeEventListener).not.toHaveBeenCalled();
            cleanup();
            expect(window.removeEventListener).toHaveBeenLastCalledWith(
                "popstate",
                callback
            );
        });
    });

    describe("LocalStorageProvider", () => {
        afterEach(() => {
            localStorage.clear();
        });

        it("should return the item", () => {
            const key = "key";
            const provider = new LocalStorageProvider(key);
            const value = "value";
            expect(provider.value()).toStrictEqual(null);
            localStorage.setItem(key, value);
            expect(provider.value()).toStrictEqual(value);
        });

        it("should set the item", () => {
            const key = "key";
            const provider = new LocalStorageProvider(key);
            const value = "value";
            expect(localStorage.getItem(key)).toStrictEqual(null);
            provider.setValue(value);
            expect(localStorage.getItem(key)).toStrictEqual(value);
        });

        it("should handle events", () => {
            const key = "key";
            const provider = new LocalStorageProvider(key);
            const callback = jest.fn();
            window.addEventListener = jest.fn();
            window.removeEventListener = jest.fn();
            const cleanup = provider.onChange(callback);
            expect(window.addEventListener).toHaveBeenCalledWith(
                "storage",
                callback
            );
            expect(window.removeEventListener).not.toHaveBeenCalled();
            cleanup();
            expect(window.removeEventListener).toHaveBeenLastCalledWith(
                "storage",
                callback
            );
        });
    });

    describe("hook", () => {
        it("should use initial value", () => {
            const initial = "initial";
            const persistence: PersistenceProvider = {
                value: jest.fn(() => null),
                setValue: jest.fn(),
                onChange: jest.fn(),
            };
            const ctx = render(
                <Test initial={initial} persistence={persistence} />
            );
            expect(ctx.getByTestId("state").textContent).toStrictEqual(initial);
        });

        it("should use persistence value", () => {
            const stored = JSON.stringify("stored");
            const initial = "initial";
            const persistence: PersistenceProvider = {
                value: jest.fn(() => stored),
                setValue: jest.fn(),
                onChange: jest.fn(),
            };
            const ctx = render(
                <Test initial={initial} persistence={persistence} />
            );
            expect(ctx.getByTestId("state").textContent).toStrictEqual(
                JSON.parse(stored)
            );
        });

        it("should set persistence value", () => {
            let value: string | null = null;
            const initial = "initial";
            const persistence: PersistenceProvider = {
                value: jest.fn(() => value),
                setValue: jest.fn((next) => (value = next)),
                onChange: jest.fn(),
            };
            const ctx = render(
                <Test initial={initial} persistence={persistence} />
            );
            expect(value).toStrictEqual(JSON.stringify(initial));
            const next = "foo";
            fireEvent.input(ctx.getByLabelText("dispatch"), {
                target: { value: next },
            });
            expect(value).toStrictEqual(JSON.stringify(next));
        });

        it("should handle events", () => {
            let value: string | null = null;
            let listener: Callback | null = null;
            const initial = "initial";
            const teardown = jest.fn();
            const persistence: PersistenceProvider = {
                value: jest.fn(() => value),
                setValue: jest.fn((next) => (value = next)),
                onChange: jest.fn((callback) => {
                    listener = callback;
                    return teardown;
                }),
            };
            const ctx = render(
                <Test initial={initial} persistence={persistence} />
            );
            expect(ctx.getByTestId("state").textContent).toStrictEqual(initial);
            value = null;
            act(listener!);
            expect(ctx.getByTestId("state").textContent).toStrictEqual(initial);
            const next = "next";
            value = JSON.stringify(next);
            act(listener!);
            expect(ctx.getByTestId("state").textContent).toStrictEqual(next);
            expect(teardown).not.toHaveBeenCalled();
            cleanup();
            expect(teardown).toHaveBeenCalled();
        });
    });
});
