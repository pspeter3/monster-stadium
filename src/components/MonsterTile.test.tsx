import { h } from "preact";
import { render, fireEvent } from "@testing-library/preact";
import { MonsterTile } from "./MonsterTile";
import { Monsters } from "../core/bestiary";

describe("MonsterTile", () => {
    it("should handle on add", () => {
        const id = "awakened-shrub";
        const monster = Monsters.get(id)!;
        const onAdd = jest.fn();
        const ctx = render(<MonsterTile monster={monster} onAdd={onAdd} />);
        fireEvent.click(ctx.getByLabelText(`Add ${monster.name}`));
        expect(onAdd).toHaveBeenCalledWith(id);
    });
});
