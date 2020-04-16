import { h } from "preact";
import { render, fireEvent } from "@testing-library/preact";
import { EncounterEditor } from "./EncounterEditor";
import { Monsters } from "../core/bestiary";

describe("EncounterEditor", () => {
    it("should set the name", () => {
        const name = "Name";
        const dispatch = jest.fn();
        const ctx = render(
            <EncounterEditor
                bestiary={Monsters}
                encounter={{ monsters: {} }}
                dispatch={dispatch}
            />
        );
        fireEvent.input(ctx.getByLabelText("Name"), {
            target: { value: name },
        });
        expect(dispatch).toHaveBeenCalledWith({ type: "name", name });
    });

    it("should filter non-existing monster", () => {
        const ctx = render(
            <EncounterEditor
                bestiary={Monsters}
                encounter={{
                    monsters: { "awakened-shrub": 1, "abominable-shrub": 1 },
                }}
                dispatch={jest.fn()}
            />
        );
        expect(ctx.queryByText("Awakened Shrub")).not.toBeNull();
        expect(ctx.queryByText("Abominable Shrub")).toBeNull();
    });
});
