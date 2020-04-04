import { h } from "preact";
import { render, fireEvent } from "@testing-library/preact";
import { MonsterTile } from "./MonsterTile";
import { Monster } from "./bestiary";

describe("Monster Tile", () => {
    const monster: Monster = {
        id: "awakened-shrub",
        name: "Awakened Shrub",
        size: "Small",
        type: "Plant",
        alignment: "Unaligned",
        environments: ["Forest", "Grassland"],
        cr: 0,
        hp: 10,
        ac: 9,
        init: -1,
        lair: false,
        legendary: false,
        unique: false,
        sources: ["basic-rules", "mm", "srd"],
    };

    const valueForState = (label: HTMLElement | null): string | null => {
        if (label === null) {
            return null;
        }
        const parent = label.parentElement;
        if (parent === null) {
            return null;
        }
        const el = parent.lastElementChild;
        if (el === null) {
            return null;
        }
        return el.textContent;
    };

    it("should render relevant information", () => {
        const ctx = render(<MonsterTile monster={monster} onAdd={jest.fn()} />);
        expect(ctx.getByText(monster.name)).not.toBeNull();
        expect(
            ctx.getByText(
                `${monster.size} ${monster.type}, ${monster.alignment}`
            )
        ).not.toBeNull();
        expect(valueForState(ctx.getByTitle("Challenge Rating"))).toStrictEqual(
            monster.cr.toString()
        );
        expect(valueForState(ctx.getByTitle("Hit Points"))).toStrictEqual(
            monster.hp.toString()
        );
        expect(valueForState(ctx.getByTitle("Armor Class"))).toStrictEqual(
            monster.ac.toString()
        );
    });

    it("should handle fractional CRs", () => {
        const shrub: Monster = {
            ...monster,
            cr: 0.25,
        };
        const ctx = render(<MonsterTile monster={shrub} onAdd={jest.fn()} />);
        expect(valueForState(ctx.getByTitle("Challenge Rating"))).toStrictEqual(
            "1/4"
        );
    });

    it("should support clicking the button", () => {
        const callback = jest.fn();
        const ctx = render(<MonsterTile monster={monster} onAdd={callback} />);
        fireEvent(
            ctx.getByLabelText(`Add ${monster.name}`),
            new MouseEvent("click")
        );
        expect(callback).toHaveBeenCalledWith(monster.id);
    });
});
