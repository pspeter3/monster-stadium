import { h, FunctionComponent, Fragment } from "preact";
import { Encounter, EncounterDispatch } from "../hooks/useEncounter";
import { Bestiary } from "../core/bestiary";
import { EncounterMonster } from "./EncounterMonster";
import { TextField } from "./TextField";

export const EncounterEditor: FunctionComponent<{
    bestiary: Bestiary;
    encounter: Encounter;
    dispatch: EncounterDispatch;
}> = ({ bestiary, encounter, dispatch }) => (
    <Fragment>
        <TextField
            label="Name"
            type="text"
            value={encounter.name}
            onInput={(name) => dispatch({ type: "name", name })}
        />
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
