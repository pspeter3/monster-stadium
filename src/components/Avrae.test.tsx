import { h } from "preact";
import { render } from "@testing-library/preact";
import { Avrae } from "./Avrae";
import { Monsters } from "../core/bestiary";

describe("Avrae", () => {
    it("should handle no name", () => {
        const ctx = render(
            <Avrae bestiary={Monsters} encounter={{ monsters: {} }} />
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
                encounter={{ monsters: { "awakened-shrub": 2 } }}
            />
        );
        expect(ctx.baseElement).toMatchSnapshot();
    });

    it("should handle non SRD monters", () => {
        const ctx = render(
            <Avrae
                bestiary={Monsters}
                encounter={{ monsters: { "abominable-yeti": 2 } }}
            />
        );
        expect(ctx.baseElement).toMatchSnapshot();
    });

    it("should handle name collisions", () => {
        const ctx = render(
            <Avrae
                bestiary={Monsters}
                encounter={{
                    monsters: { "abominable-yeti": 2, "awakened-shrub": 2 },
                }}
            />
        );
        expect(ctx.baseElement).toMatchSnapshot();
    });

    it("should handle missing monsters", () => {
        const ctx = render(
            <Avrae
                bestiary={Monsters}
                encounter={{
                    monsters: { "abominable-shrub": 2 },
                }}
            />
        );
        expect(ctx.baseElement).toMatchSnapshot();
    });
});
