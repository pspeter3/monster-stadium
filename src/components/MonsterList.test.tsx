import { h } from "preact";
import { render, fireEvent } from "@testing-library/preact";
import { MonsterList } from "./MonsterList";
import { Monsters } from "../core/bestiary";

describe("MonsterList", () => {
    afterEach(() => {
        localStorage.clear();
    });

    it("should set the pattern", () => {
        const value = "Acolyte";
        const ctx = render(<MonsterList bestiary={Monsters} onAdd={jest.fn} />);
        fireEvent.input(ctx.getByLabelText("Search"), {
            target: { value },
        });
        expect(ctx.queryByDisplayValue(value)).not.toBeNull();
    });
});
