import { h, Fragment, FunctionComponent } from "preact";
import { render, fireEvent, cleanup } from "@testing-library/preact";
import { useSearchParams } from "./useSearchParams";
import { NavigationService, createNavigation } from "../services/navigation";

const Test: FunctionComponent<{ navigation: NavigationService }> = ({
    navigation,
}) => {
    const [params, setParams] = useSearchParams(navigation);
    return (
        <Fragment>
            <input
                type="text"
                aria-label="Params"
                onInput={(event) =>
                    setParams(
                        new URLSearchParams(
                            (event.target as HTMLInputElement).value
                        )
                    )
                }
            />
            <pre data-testid="params">{params.toString()}</pre>
        </Fragment>
    );
};

describe("useSearchParams", () => {
    it("should handle initial state", () => {
        const search = "foo=bar";
        const navigation = createNavigation(
            { search: `?${search}` },
            { pushState: jest.fn() },
            { addEventListener: jest.fn(), removeEventListener: jest.fn() }
        );
        const ctx = render(<Test navigation={navigation} />);
        expect(ctx.getByTestId("params").textContent).toStrictEqual(search);
    });

    it("should handle push state", () => {
        const pushState = jest.fn();
        const navigation = createNavigation(
            { search: "" },
            { pushState },
            { addEventListener: jest.fn(), removeEventListener: jest.fn() }
        );
        const ctx = render(<Test navigation={navigation} />);
        const search = "foo=bar";
        fireEvent.input(ctx.getByLabelText("Params"), {
            target: { value: search },
        });
        expect(pushState).toHaveBeenCalledWith(null, "", `?${search}`);
    });

    it("should handle pop state", () => {
        const location = { search: "" };
        const addEventListener = jest.fn();
        const removeEventListener = jest.fn();
        const navigation = createNavigation(
            location,
            { pushState: jest.fn() },
            { addEventListener, removeEventListener }
        );
        let callback: () => void = () => {
            throw new Error("Callback not set");
        };
        addEventListener.mockImplementation(
            (event: string, listener: () => void) => {
                expect(event).toStrictEqual("popstate");
                callback = listener;
            }
        );
        const ctx = render(<Test navigation={navigation} />);
        const search = "?foo=bar";
        location.search = search;
        callback();
        expect(ctx.getByTestId("params").textContent).toStrictEqual(search);
        cleanup();
        expect(removeEventListener).toHaveBeenCalledWith("popstate", callback);
    });
});
