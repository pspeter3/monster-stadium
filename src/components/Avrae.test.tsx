import { h } from "preact";
import { render, fireEvent } from "@testing-library/preact";
import { Avrae } from "./Avrae";
import { Monsters } from "../core/bestiary";

describe("Avrae", () => {
    it("should handle no name", () => {
        const ctx = render(
            <Avrae bestiary={Monsters} encounter={{ name: "", monsters: {} }} />
        );
        expect(ctx.baseElement).toMatchSnapshot();
    });

    it("should handle a name", () => {
        const ctx = render(
            <Avrae
                bestiary={Monsters}
                encounter={{ name: "Test", monsters: {} }}
            />
        );
        expect(ctx.baseElement).toMatchSnapshot();
    });

    it("should handle SRD monsters", () => {
        const ctx = render(
            <Avrae
                bestiary={Monsters}
                encounter={{ name: "", monsters: { "awakened-shrub": 2 } }}
            />
        );
        expect(ctx.baseElement).toMatchSnapshot();
    });

    it("should handle missing monsters", () => {
        const ctx = render(
            <Avrae
                bestiary={Monsters}
                encounter={{
                    name: "",
                    monsters: { "abominable-shrub": 2 },
                }}
            />
        );
        expect(ctx.baseElement).toMatchSnapshot();
    });

    it("should write to the clipboard", () => {
        const ctx = render(
            <Avrae
                bestiary={Monsters}
                encounter={{
                    name: "",
                    monsters: { "abominable-yeti": 2, "awakened-shrub": 2 },
                }}
            />
        );
        const mock = jest.fn();
        const clipboard = navigator.clipboard;
        (navigator as any).clipboard = {
            writeText: mock,
        } as any;
        fireEvent.click(ctx.getByText("Copy"));
        expect(mock).toHaveBeenCalled();
        (navigator as any).clipboard = clipboard;
    });
});
