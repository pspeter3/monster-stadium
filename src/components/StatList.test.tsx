import { h } from "preact";
import { render } from "@testing-library/preact";
import { StatList } from "./StatList";

describe("StatList", () => {
    it("should hanle factional values", () => {
        const id = "CR";
        const title = "Challenge Rating";
        const value = 0.25;
        const ctx = render(<StatList stats={[{ id, title, value }]} />);
        expect(ctx.getByTitle(title).textContent).toStrictEqual(id);
        expect(ctx.queryByText(`1/${1 / value}`)).not.toBeNull();
    });

    it("should hanle factional values", () => {
        const id = "CR";
        const title = "Challenge Rating";
        const value = 1;
        const ctx = render(<StatList stats={[{ id, title, value }]} />);
        expect(ctx.getByTitle(title).textContent).toStrictEqual(id);
        expect(ctx.queryByText(value.toString())).not.toBeNull();
    });
});
