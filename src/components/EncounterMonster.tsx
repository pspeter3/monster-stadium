import { h, FunctionComponent } from "preact";
import { EncounterDispatch } from "../hooks/useEncounter";
import { MonsterName } from "./MonsterName";
import { PlusCircle, MinusCircle } from "preact-feather";
import { IconButton } from "./IconButton";

export const EncounterMonster: FunctionComponent<{
    id: string;
    name: string;
    count: number;
    dispatch: EncounterDispatch;
}> = ({ id, name, count, dispatch }) => (
    <li class="flex items-center px-1 py-3">
        <span class="font-bold leading-6 mr-3 text-center text-gray-700 w-12">
            {count}
        </span>
        <MonsterName id={id} name={name} />
        <IconButton
            label={`Decrement ${name}`}
            variant="danger"
            onClick={() => dispatch({ type: "decrement", id })}
            icon={MinusCircle}
        />
        <IconButton
            label={`Increment ${name}`}
            variant="secondary"
            onClick={() => dispatch({ type: "increment", id })}
            icon={PlusCircle}
        />
    </li>
);
