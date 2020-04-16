import { h } from "preact";
import { render, fireEvent } from "@testing-library/preact";
import { EncounterMonster } from "./EncounterMonster";

describe("Encounter Monster", () => {
    it("should show the count", () => {
        const id = "awakened-shrub";
        const count = 5;
        const dispatch = jest.fn();
        const ctx = render(
            <EncounterMonster
                id={id}
                name="Awakened Shrub"
                count={count}
                dispatch={dispatch}
            />
        );
        expect(ctx.queryByText(count.toString())).not.toBeNull;
    });

    it("should decrement", () => {
        const id = "awakened-shrub";
        const name = "Awakened Shrub";
        const count = 5;
        const dispatch = jest.fn();
        const ctx = render(
            <EncounterMonster
                id={id}
                name={name}
                count={count}
                dispatch={dispatch}
            />
        );
        fireEvent.click(ctx.getByLabelText(`Decrement ${name}`));
        expect(dispatch).toHaveBeenCalledWith({ type: "decrement", id });
    });

    it("should increment", () => {
        const id = "awakened-shrub";
        const name = "Awakened Shrub";
        const count = 5;
        const dispatch = jest.fn();
        const ctx = render(
            <EncounterMonster
                id={id}
                name={name}
                count={count}
                dispatch={dispatch}
            />
        );
        fireEvent.click(ctx.getByLabelText(`Increment ${name}`));
        expect(dispatch).toHaveBeenCalledWith({ type: "increment", id });
    });
});
