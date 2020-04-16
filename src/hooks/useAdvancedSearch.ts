import {
    Size,
    Type,
    Alignment,
    Environment,
    ChallengeRating,
    SourceID,
    Sizes,
    Types,
    Environments,
} from "../core/bestiary";
import {
    PersistenceAction,
    LocalStorageProvider,
    usePersistentReducer,
} from "./usePersistentReducer";

export interface AdvancedSearch {
    readonly sizes: ReadonlyArray<Size>;
    readonly types: ReadonlyArray<Type>;
    readonly alignments: ReadonlyArray<Alignment>;
    readonly environments: ReadonlyArray<Environment>;
    readonly cr: readonly [ChallengeRating, ChallengeRating];
    readonly lair: boolean;
    readonly legendary: boolean;
    readonly unique: boolean;
    readonly sources: ReadonlyArray<SourceID>;
}

export type AdvancedSearchMembershipAction =
    | Readonly<{
          type: "membership";
          key: "sizes" | "types" | "alignments" | "environments" | "sources";
          item: Size | Type | Alignment | Environment | SourceID;
      }>
    | Readonly<{
          type: "membership";
          key: "sizes";
          item: Size;
      }>
    | Readonly<{
          type: "membership";
          key: "types";
          item: Type;
      }>
    | Readonly<{
          type: "membership";
          key: "alignments";
          item: Alignment;
      }>
    | Readonly<{
          type: "membership";
          key: "environments";
          item: Environment;
      }>
    | Readonly<{
          type: "membership";
          key: "sources";
          item: SourceID;
      }>;

export type AdvancedSearchChallengeRatingAction = Readonly<{
    type: "cr";
    cr: readonly [ChallengeRating, ChallengeRating];
}>;

export type AdvancedSearchToggleAction = Readonly<{
    type: "toggle";
    key: "lair" | "legendary" | "unique";
}>;

export type AdvancedSearchAction =
    | PersistenceAction<AdvancedSearch>
    | AdvancedSearchMembershipAction
    | AdvancedSearchChallengeRatingAction
    | AdvancedSearchToggleAction;

export type AdvancedSearchDispatch = (action: AdvancedSearchAction) => void;

export const reducer = (
    advancedSearch: AdvancedSearch,
    action: AdvancedSearchAction
): AdvancedSearch => {
    switch (action.type) {
        case "persistence": {
            return action.value;
        }
        case "membership": {
            const { key, item } = action;
            const items = advancedSearch[key] as string[];
            return {
                ...advancedSearch,
                [key]: items.includes(item)
                    ? items.filter((i) => i !== item)
                    : [...items, item],
            };
        }
        case "cr": {
            const { cr } = action;
            return {
                ...advancedSearch,
                cr,
            };
        }
        case "toggle": {
            const { key } = action;
            return {
                ...advancedSearch,
                [key]: !advancedSearch[key],
            };
        }
    }
};

const persistence = new LocalStorageProvider("search");

export const initial: AdvancedSearch = {
    sizes: Array.from(Sizes),
    types: Array.from(Types),
    alignments: ["Any"],
    environments: Array.from(Environments),
    cr: [0, 30],
    lair: false,
    legendary: false,
    unique: false,
    sources: ["srd"],
};

/* istanbul ignore next */
export const useAdvancedSearch = (): [AdvancedSearch, AdvancedSearchDispatch] =>
    usePersistentReducer(reducer, initial, {
        persistence,
        serializer: JSON,
    });
