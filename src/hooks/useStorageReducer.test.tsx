import { h, FunctionalComponent, Fragment } from "preact";
import { render, fireEvent } from "@testing-library/preact";
import { useStorageReducer } from "./useStorageReducer";

const Test: FunctionalComponent<{ id: string; initial: string }> = ({
    id,
    initial,
}) => {
    const [state, dispatch] = useStorageReducer(
        id,
        (_: string, next: string) => next,
        initial
    );
    return (
        <Fragment>
            <pre data-testid="state">{state}</pre>
            <input
                aria-label="dispatch"
                onInput={(event) =>
                    dispatch((event.target as HTMLInputElement).value)
                }
            />
        </Fragment>
    );
};

describe("useStorageReducer", () => {
    afterEach(() => {
        localStorage.clear();
    });

    it("should use initial value", () => {
        const initial = "initial";
        const ctx = render(<Test id="test" initial={initial} />);
        expect(ctx.getByTestId("state").textContent).toStrictEqual(initial);
    });

    it("should use storage value", () => {
        const key = "test";
        const storage = "storage";
        localStorage.setItem(key, JSON.stringify(storage));
        const ctx = render(<Test id={key} initial="initial" />);
        expect(ctx.getByTestId("state").textContent).toStrictEqual(storage);
    });

    it("should set storage value", () => {
        const key = "test";
        const value = "value";
        const ctx = render(<Test id={key} initial="initial" />);
        fireEvent.input(ctx.getByLabelText("dispatch"), {
            target: {
                value,
            },
        });
        expect(localStorage.getItem(key)).toStrictEqual(JSON.stringify(value));
    });
});
