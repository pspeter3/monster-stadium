import { h, Fragment, FunctionComponent } from "preact";
import { render, fireEvent, cleanup, act } from "@testing-library/preact";
import { useQueryString } from "./useQueryString";

const Test: FunctionComponent = () => {
    const [queryString, setQueryString] = useQueryString();
    return (
        <Fragment>
            <input
                type="text"
                aria-label="Params"
                onInput={(event) =>
                    setQueryString((event.target as HTMLInputElement).value)
                }
            />
            <pre data-testid="params">{queryString}</pre>
        </Fragment>
    );
};

describe("useQueryString", () => {
    let href = "";

    beforeEach(() => {
        href = location.href;
    });

    afterEach(() => {
        history.replaceState(null, "", href);
    });

    it("should handle initial state", () => {
        const queryString = "?foo=bar";
        history.replaceState(null, "", queryString);
        const ctx = render(<Test />);
        expect(ctx.getByTestId("params").textContent).toStrictEqual(
            queryString
        );
    });

    it("should handle push state", () => {
        const ctx = render(<Test />);
        const queryString = "foo=bar";
        expect(location.search).toStrictEqual("");
        fireEvent.input(ctx.getByLabelText("Params"), {
            target: { value: queryString },
        });
        expect(location.search).toStrictEqual(`?${queryString}`);
    });

    it("should handle pop state", () => {
        let callback = () => {};
        window.addEventListener = jest.fn((event, listener) => {
            expect(event).toStrictEqual("popstate");
            callback = listener as () => void;
        });
        window.removeEventListener = jest.fn();
        const ctx = render(<Test />);
        const queryString = "?foo=bar";
        history.replaceState(null, "", queryString);
        act(callback);
        expect(ctx.getByTestId("params").textContent).toStrictEqual(
            queryString
        );
        cleanup();
        expect(window.removeEventListener).toHaveBeenCalledWith(
            "popstate",
            callback
        );
    });
});
