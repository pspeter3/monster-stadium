import { h } from "preact";
import { render } from "@testing-library/preact";
import { Header } from "./Header";

describe("Header", () => {
    it("should have a title", () => {
        const ctx = render(<Header />);
        expect(ctx.getByText("Monster Stadium")).not.toBeNull();
    });

    it("should have a link", () => {
        const ctx = render(<Header />);
        expect(ctx.getByLabelText("About")).not.toBeNull();
    });
});
