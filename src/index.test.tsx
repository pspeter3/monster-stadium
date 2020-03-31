import { Title } from "./index";
import { h } from "preact";
import { render } from "@testing-library/preact";

describe("index", () => {
    test("Title", () => {
        const ctx = render(<Title />);
        expect(ctx.queryAllByText("Monster Stadium")).toHaveLength(2);
    });
});
