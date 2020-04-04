import { h } from "preact";
import { render } from "@testing-library/preact";
import { cx, override, el } from "./utils";

describe("utils", () => {
    describe("cx", () => {
        it("should merge classes", () => {
            expect(cx(["foo", "bar"])).toStrictEqual("foo bar");
        });
    });

    describe("override", () => {
        it("should handle defaults only", () => {
            expect(override("foo")).toStrictEqual("foo");
        });

        it("should handle overrides", () => {
            expect(override("foo", "bar")).toStrictEqual("foo bar");
        });
    });

    describe("el", () => {
        it("should create elements", () => {
            const Component = el("p", ["text-gray-700"]);
            const label = "foo";
            const ctx = render(<Component aria-label={label} />);
            expect(ctx.getByLabelText(label)).not.toBeNull();
        });

        it("should allow override classes", () => {
            const Component = el("p", ["text-gray-700"]);
            const label = "foo";
            const ctx = render(
                <Component class="bg-gray-100" aria-label={label} />
            );
            expect(ctx.getByLabelText(label).className).toStrictEqual(
                "text-gray-700 bg-gray-100"
            );
        });
    });
});
