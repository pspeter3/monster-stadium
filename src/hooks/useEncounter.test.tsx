import { h, FunctionalComponent, Fragment, JSX } from "preact";
import {
    render,
    fireEvent,
    RenderResult,
    act,
    cleanup,
} from "@testing-library/preact";
import { useEncounter } from "./useEncounter";
import { Encounter } from "../schema";

const Test: FunctionalComponent<{ id: string }> = ({ id }) => {
    const [encounter, dispatch] = useEncounter();
    const onClick = (
        event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const target = event.target as HTMLButtonElement;
        const type = target.getAttribute("aria-label");
        if (type !== "increment" && type !== "decrement") {
            throw new Error(`Invalid type ${type}`);
        }
        dispatch({ type, id });
    };
    return (
        <Fragment>
            <pre data-testid="encounter">{JSON.stringify(encounter)}</pre>
            <input
                aria-label="name"
                onInput={(event) =>
                    dispatch({
                        type: "name",
                        name: (event.target as HTMLInputElement).value,
                    })
                }
            />
            <button aria-label="increment" onClick={onClick} />
            <button aria-label="decrement" onClick={onClick} />
        </Fragment>
    );
};

describe("useEncounter", () => {
    let href = "";

    beforeEach(() => {
        href = location.href;
    });

    afterEach(() => {
        history.replaceState(null, "", href);
    });

    const findEncounter = (ctx: RenderResult): Encounter => {
        const output = ctx.getByTestId("encounter");
        const data = output.textContent;
        if (data === null) {
            throw new Error("Missing text content");
        }
        return JSON.parse(data);
    };

    describe("actions", () => {
        describe("name", () => {
            it("should set the name", async () => {
                const id = "awakened-shrub";
                const ctx = render(<Test id={id} />);
                const name = "foo";
                fireEvent.input(ctx.getByLabelText("name"), {
                    target: { value: name },
                });
                expect(findEncounter(ctx).name).toStrictEqual(name);
            });
        });

        describe("incement", () => {
            it("should handle incrementing", () => {
                const id = "awakened-shrub";
                const ctx = render(<Test id={id} />);
                expect(findEncounter(ctx).monsters).toStrictEqual({});
                const button = ctx.getByLabelText("increment");

                fireEvent.click(button);
                expect(findEncounter(ctx).monsters).toStrictEqual({ [id]: 1 });
                fireEvent.click(button);
                expect(findEncounter(ctx).monsters).toStrictEqual({ [id]: 2 });
            });
        });

        describe("decrement", () => {
            it("should handle missing monsters", () => {
                const id = "awakened-shrub";
                const ctx = render(<Test id={id} />);
                const button = ctx.getByLabelText("decrement");
                fireEvent.click(button);
                expect(findEncounter(ctx).monsters).toStrictEqual({});
            });

            it("should handle decrement monsters", () => {
                const id = "awakened-shrub";
                const ctx = render(<Test id={id} />);
                const increment = ctx.getByLabelText("increment");
                const decrement = ctx.getByLabelText("decrement");
                fireEvent.click(increment);
                fireEvent.click(increment);
                fireEvent.click(decrement);
                expect(findEncounter(ctx).monsters).toStrictEqual({ [id]: 1 });
            });
        });
    });

    describe("location", () => {
        describe("parsing", () => {
            it("should handle non numbers", () => {
                const id = "awakened-shrub";
                history.replaceState(null, "", "?foo=bar");
                const ctx = render(<Test id={id} />);
                expect(findEncounter(ctx)).toStrictEqual({ monsters: {} });
            });

            it("should handle valid state", () => {
                const name = "Test";
                const id = "awakened-shrub";
                const count = 1;
                history.replaceState(null, "", `?name=${name}&${id}=${count}`);
                const ctx = render(<Test id={id} />);
                expect(findEncounter(ctx)).toStrictEqual({
                    name,
                    monsters: { [id]: count },
                });
            });
        });

        describe("serialization", () => {
            it("should set the url correctly", () => {
                const id = "awakened-shrub";
                const name = "foo";
                const ctx = render(<Test id={id} />);
                fireEvent.input(ctx.getByLabelText("name"), {
                    target: { value: name },
                });
                fireEvent.click(ctx.getByLabelText("increment"));
                expect(location.search).toStrictEqual(`?name=${name}&${id}=1`);
            });
        });

        describe("history", () => {
            it("should override the encounter on popstate", () => {
                let callback = () => {};
                window.addEventListener = jest.fn((event, listener) => {
                    expect(event).toStrictEqual("popstate");
                    callback = listener as () => void;
                });
                const id = "awakened-shrub";
                const name = "foo";
                const count = 1;
                const ctx = render(<Test id={id} />);
                history.replaceState(null, "", `?name=${name}&${id}=${count}`);
                act(callback);
                expect(findEncounter(ctx)).toStrictEqual({
                    name,
                    monsters: { [id]: count },
                });
            });

            it("should remove the event listener after unmount", () => {
                let callback = () => {};
                window.addEventListener = jest.fn((event, listener) => {
                    expect(event).toStrictEqual("popstate");
                    callback = listener as () => void;
                });
                window.removeEventListener = jest.fn();
                const id = "awakened-shrub";
                render(<Test id={id} />);
                cleanup();
                expect(window.removeEventListener).toHaveBeenCalledWith(
                    "popstate",
                    callback
                );
            });
        });
    });
});
