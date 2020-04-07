import { reducer, Encounter, serializer } from "./useEncounter";

describe("useEncounter", () => {
    describe("reducer", () => {
        describe("persistence", () => {
            it("should override the value", () => {
                const encounter: Encounter = { monsters: { foo: 1 } };
                expect(
                    reducer(
                        { monsters: {} },
                        { type: "persistence", value: encounter }
                    )
                ).toStrictEqual(encounter);
            });
        });

        describe("name", () => {
            it("should set the name", () => {
                const name = "name";
                expect(
                    reducer({ monsters: {} }, { type: "name", name })
                ).toStrictEqual({
                    name,
                    monsters: {},
                });
            });
        });

        describe("increment", () => {
            it("should handle new monsters", () => {
                const id = "awakened-shrub";
                expect(
                    reducer({ monsters: {} }, { type: "increment", id })
                ).toStrictEqual({ monsters: { [id]: 1 } });
            });

            it("should handle existing monsters", () => {
                const id = "awakened-shrub";
                expect(
                    reducer(
                        { monsters: { [id]: 1 } },
                        { type: "increment", id }
                    )
                ).toStrictEqual({ monsters: { [id]: 2 } });
            });
        });

        describe("decrement", () => {
            it("should ignore missing monster", () => {
                expect(
                    reducer(
                        { monsters: {} },
                        { type: "decrement", id: "missing" }
                    )
                ).toStrictEqual({ monsters: {} });
            });

            it("should remove monsters", () => {
                const id = "awakened-shrub";
                expect(
                    reducer(
                        { monsters: { [id]: 1 } },
                        { type: "decrement", id }
                    )
                ).toStrictEqual({ monsters: {} });
            });

            it("should decrement monsters", () => {
                const id = "awakened-shrub";
                expect(
                    reducer(
                        { monsters: { [id]: 2 } },
                        { type: "decrement", id }
                    )
                ).toStrictEqual({ monsters: { [id]: 1 } });
            });
        });
    });

    describe("serializer", () => {
        describe("parse", () => {
            it("should handle the name", () => {
                const name = "name";
                expect(serializer.parse(`?name=${name}`)).toStrictEqual({
                    name,
                    monsters: {},
                });
            });

            it("should ignore non numbers", () => {
                expect(serializer.parse(`?foo=bar`)).toStrictEqual({
                    monsters: {},
                });
            });

            it("should set monsters", () => {
                const id = "awakened-shrub";
                expect(serializer.parse(`?${id}=1`)).toStrictEqual({
                    monsters: { [id]: 1 },
                });
            });
        });

        describe("string", () => {
            it("should handle name", () => {
                const name = "name";
                expect(
                    serializer.stringify({ name, monsters: {} })
                ).toStrictEqual(`${name}=name`);
            });

            it("should handle monsters", () => {
                const id = "awakened-shurb";
                const count = 1;
                expect(
                    serializer.stringify({ monsters: { [id]: count } })
                ).toStrictEqual(`${id}=${count}`);
            });
        });
    });
});
