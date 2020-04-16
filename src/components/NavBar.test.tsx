import { h } from "preact";
import { render } from "@testing-library/preact";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
    it("should have a title", () => {
        const ctx = render(<NavBar />);
        expect(ctx.getByText("Monster Stadium")).not.toBeNull();
    });

    it("should have a link", () => {
        const ctx = render(<NavBar />);
        expect(ctx.getByLabelText("About")).not.toBeNull();
    });
});
