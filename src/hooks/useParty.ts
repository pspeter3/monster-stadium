import {
    PersistenceAction,
    LocalStorageProvider,
    usePersistentReducer,
} from "./usePersistentReducer";

export type Level =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18"
    | "19"
    | "20";

export const Levels = new Set<Level>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
]);

export type Party = Readonly<Partial<Record<Level, number>>>;

export type PartyIncrementAction = Readonly<{
    type: "increment";
    level: Level;
}>;

export type PartyDecrementAction = Readonly<{
    type: "decrement";
    level: Level;
}>;

export type PartyAction =
    | PersistenceAction<Party>
    | PartyIncrementAction
    | PartyDecrementAction;

export type PartyDispatch = (action: PartyAction) => void;

const valueOf = (party: Party, level: Level): number =>
    party[level] === undefined ? 0 : party[level]!;

export const reducer = (party: Party, action: PartyAction): Party => {
    switch (action.type) {
        case "persistence": {
            return action.value;
        }
        case "increment": {
            const { level } = action;
            return {
                ...party,
                [level]: valueOf(party, level) + 1,
            };
        }
        case "decrement": {
            const { level } = action;
            const value = valueOf(party, level) - 1;
            if (value <= 0) {
                const { [level]: _, ...remaining } = party;
                return remaining;
            }
            return {
                ...party,
                [level]: value,
            };
        }
    }
};

const persistence = new LocalStorageProvider("party");

export const useParty = () =>
    usePersistentReducer(reducer, {} as Party, {
        persistence,
        serializer: JSON,
    });
