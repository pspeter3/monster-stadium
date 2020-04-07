import { Encounter } from "../schema";
import { useReducer, useEffect } from "preact/hooks";

export type EncounterSetAction = Readonly<{
    type: "set";
    encounter: Encounter;
}>;

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
    | EncounterSetAction
    | EncouterNameAction
    | EncounterIncrementAction
    | EncounterDecrementAction;

const valueOf = (
    monsters: Readonly<Record<string, number>>,
    id: string
): number => (monsters[id] === undefined ? 0 : monsters[id]);

const reducer = (encounter: Encounter, action: EncounterAction): Encounter => {
    switch (action.type) {
        case "set": {
            return action.encounter;
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

export type EncounterDispatch = (action: EncounterAction) => void;

const parseEncounter = (queryString: string): Encounter => {
    const params = new URLSearchParams(queryString);
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
};

const serializeEncounter = (encounter: Encounter): string => {
    const params = new URLSearchParams();
    if (encounter.name) {
        params.set("name", encounter.name);
    }
    Object.keys(encounter.monsters).forEach((id) => {
        params.set(id, encounter.monsters[id].toString());
    });
    return params.toString();
};

export const useEncounter = (): [Encounter, EncounterDispatch] => {
    const ctx = useReducer(reducer, parseEncounter(location.search));
    const [encounter, dispatch] = ctx;
    useEffect(() => {
        const search = serializeEncounter(encounter);
        if (location.search !== search) {
            history.pushState(null, "", `?${search}`);
        }
    }, [encounter]);
    useEffect(() => {
        const listener = () =>
            dispatch({
                type: "set",
                encounter: parseEncounter(location.search),
            });
        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
    }, []);
    return ctx;
};
