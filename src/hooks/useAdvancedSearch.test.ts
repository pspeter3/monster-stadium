import {
    reducer,
    initial,
    AdvancedSearch,
    AdvancedSearchMembershipAction,
} from "./useAdvancedSearch";
import {
    Size,
    Type,
    Alignment,
    Environment,
    SourceID,
    ChallengeRating,
} from "../core/bestiary";

describe("useAdvancedSearch", () => {
    describe("reducer", () => {
        describe("persistence", () => {
            it("should override the value", () => {
                const override: AdvancedSearch = {
                    ...initial,
                    cr: [3, 4],
                };
                expect(
                    reducer(initial, { type: "persistence", value: override })
                ).toStrictEqual(override);
            });
        });

        describe("membership", () => {
            const factory = (
                data:
                    | { key: "sizes"; item: Size }
                    | { key: "types"; item: Type }
                    | { key: "alignments"; item: Alignment }
                    | { key: "environments"; item: Environment }
                    | { key: "sources"; item: SourceID }
            ): void => {
                const { key, item } = data;
                const action = {
                    type: "membership",
                    key,
                    item,
                } as AdvancedSearchMembershipAction;
                describe(key, () => {
                    it(`should add item for ${key}`, () => {
                        const override: AdvancedSearch = {
                            ...initial,
                            [key]: [],
                        };
                        expect(override[key]).toStrictEqual([]);
                        expect(reducer(override, action)).toStrictEqual({
                            ...override,
                            [key]: [item],
                        });
                    });

                    it(`should remove item for ${key}`, () => {
                        const override: AdvancedSearch = {
                            ...initial,
                            [key]: [item],
                        };
                        expect(override[key]).toStrictEqual([item]);
                        expect(reducer(override, action)).toStrictEqual({
                            ...override,
                            [key]: [],
                        });
                    });
                });
            };

            factory({ key: "sizes", item: "Tiny" });
            factory({ key: "types", item: "Beast" });
            factory({ key: "alignments", item: "Any" });
            factory({ key: "environments", item: "Grassland" });
            factory({ key: "sources", item: "srd" });
        });

        describe("cr", () => {
            it("should se the cr", () => {
                const cr: readonly [ChallengeRating, ChallengeRating] = [1, 3];
                expect(reducer(initial, { type: "cr", cr })).toStrictEqual({
                    ...initial,
                    cr,
                });
            });
        });

        describe("toggle", () => {
            const factory = (key: "lair" | "legendary" | "unique") => {
                describe(key, () => {
                    it("should make it true", () => {
                        expect(
                            reducer(initial, { type: "toggle", key })
                        ).toStrictEqual({
                            ...initial,
                            [key]: true,
                        });
                    });

                    it("should make it false", () => {
                        const override = {
                            ...initial,
                            [key]: true,
                        };
                        expect(
                            reducer(override, { type: "toggle", key })
                        ).toStrictEqual({
                            ...override,
                            [key]: false,
                        });
                    });
                });
            };

            factory("lair");
            factory("legendary");
            factory("unique");
        });
    });
});
