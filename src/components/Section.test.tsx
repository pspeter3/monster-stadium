import { h } from "preact";
import { render, fireEvent } from "@testing-library/preact";
import { Section } from "./Section";

describe("Section", () => {
    it("should toggle rendering the children", () => {
        const title = "title";
        const children = "children";
        const ctx = render(<Section title={title}><p>{children}</p></Section>);
        expect(ctx.queryByText(title)).not.toBeNull();
        expect(ctx.queryByText(children)).not.toBeNull();
        fireEvent.click(ctx.getByText(title));
        expect(ctx.queryByText(children)).toBeNull();
    });
});
