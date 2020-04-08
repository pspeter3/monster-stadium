import { reducer, Party } from "./useParty";

describe("useParty", () => {
    describe("reducer", () => {
        describe("persistence", () => {
            it("should override the value", () => {
                const party: Party = { "1": 4 };
                expect(
                    reducer({}, { type: "persistence", value: party })
                ).toStrictEqual(party);
            });
        });

        describe("increment", () => {
            it("should handle new levels", () => {
                const level = "1";
                expect(
                    reducer({}, { type: "increment", level })
                ).toStrictEqual({ [level]: 1 });
            });

            it("should handle existing levels", () => {
                const level = "1";
                expect(
                    reducer({ [level]: 1 }, { type: "increment", level })
                ).toStrictEqual({ [level]: 2 });
            });
        });

        describe("decrement", () => {
            it("should ignore missing level", () => {
                expect(
                    reducer({}, { type: "decrement", level: "1" })
                ).toStrictEqual({});
            });

            it("should remove levels", () => {
                const level = "1";
                expect(
                    reducer({ [level]: 1 }, { type: "decrement", level })
                ).toStrictEqual({});
            });

            it("should decrement levels", () => {
                const level = "1";
                expect(
                    reducer({ [level]: 2 }, { type: "decrement", level })
                ).toStrictEqual({ [level]: 1 });
            });
        });
    });
});
