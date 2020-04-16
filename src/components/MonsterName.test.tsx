import { h } from "preact";
import { render } from "@testing-library/preact";
import { MonsterName } from "./MonsterName";

describe("MonsterName", () => {
    it("should have a name", () => {
        const name = "name";
        const ctx = render(<MonsterName id="id" name={name} />);
        expect(ctx.queryByText(name)).not.toBeNull();
    });

    it("should have a link", () => {
        const id = "id";
        const name = "name";
        const ctx = render(<MonsterName id="id" name={name} />);
        expect(ctx.getByText(name).getAttribute("href")).toContain(id);
    });
});
