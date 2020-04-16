import { h, FunctionComponent, Fragment } from "preact";
import { Encounter, EncounterDispatch } from "../hooks/useEncounter";
import { Bestiary } from "../core/bestiary";
import { EncounterMonster } from "./EncounterMonster";

export const EncounterEditor: FunctionComponent<{
    bestiary: Bestiary;
    encounter: Encounter;
    dispatch: EncounterDispatch;
}> = ({ bestiary, encounter, dispatch }) => (
    <Fragment>
        <div class="px-4 py-3">
            <input
                class="border-2 border-gray-200 focus:outline-none focus:shadow-outline focus:border-teal-600 h-12 px-2 rounded text-gray-800 w-full"
                type="text"
                aria-label="Name"
                placeholder="Name"
                onInput={(event) => {
                    const target = event.target as HTMLInputElement;
                    dispatch({ type: "name", name: target.value });
                }}
                value={encounter.name}
            />
        </div>
        <ul>
            {Object.keys(encounter.monsters)
                .filter((id) => bestiary.has(id))
                .sort()
                .map((id) => {
                    const { name } = bestiary.get(id)!;
                    return (
                        <EncounterMonster
                            id={id}
                            name={name}
                            count={encounter.monsters[id]}
                            dispatch={dispatch}
                        />
                    );
                })}
        </ul>
    </Fragment>
);
