import {
    usePersistentReducer,
    PersistenceAction,
    QueryStringProvider,
    Serializer,
} from "./usePersistentReducer";

export interface Encounter {
    readonly name?: string;
    readonly monsters: Readonly<Record<string, number>>;
}

export type EncouterNameAction = Readonly<{
    type: "name";
    name: string;
}>;

export type EncounterIncrementAction = Readonly<{
    type: "increment";
    id: string;
}>;

export type EncounterDecrementAction = Readonly<{
    type: "decrement";
    id: string;
}>;

export type EncounterAction =
    | PersistenceAction<Encounter>
    | EncouterNameAction
    | EncounterIncrementAction
    | EncounterDecrementAction;

export type EncounterDispatch = (action: EncounterAction) => void;

const valueOf = (
    monsters: Readonly<Record<string, number>>,
    id: string
): number => (monsters[id] === undefined ? 0 : monsters[id]);

export const reducer = (
    encounter: Encounter,
    action: EncounterAction
): Encounter => {
    switch (action.type) {
        case "persistence": {
            return action.value;
        }
        case "name": {
            const { name } = action;
            return { ...encounter, name };
        }
        case "increment": {
            const { id } = action;
            const { monsters } = encounter;
            return {
                ...encounter,
                monsters: {
                    ...monsters,
                    [id]: valueOf(monsters, id) + 1,
                },
            };
        }
        case "decrement": {
            const { id } = action;
            const { monsters } = encounter;
            const value = valueOf(monsters, id) - 1;
            if (value <= 0) {
                const { [id]: _, ...remaining } = monsters;
                return {
                    ...encounter,
                    monsters: remaining,
                };
            }
            return {
                ...encounter,
                monsters: {
                    ...monsters,
                    [id]: value,
                },
            };
        }
    }
};

const persistence = new QueryStringProvider();

export const serializer: Serializer<Encounter> = {
    parse(data) {
        const params = new URLSearchParams(data);
        const encounter: { name?: string; monsters: Record<string, number> } = {
            monsters: {},
        };
        for (let [key, value] of params) {
            if (key === "name") {
                encounter.name = value;
            } else {
                const count = parseInt(value);
                if (!Number.isNaN(count)) {
                    encounter.monsters[key] = count;
                }
            }
        }
        return encounter;
    },
    stringify(encounter) {
        const params = new URLSearchParams();
        if (encounter.name) {
            params.set("name", encounter.name);
        }
        Object.keys(encounter.monsters).forEach((id) => {
            params.set(id, encounter.monsters[id].toString());
        });
        return params.toString();
    },
};

/* istanbul ignore next */
export const useEncounter = (): [Encounter, EncounterDispatch] =>
    usePersistentReducer(
        reducer,
        { monsters: {} },
        { persistence, serializer }
    );
