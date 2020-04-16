import { h, FunctionComponent } from "preact";
import { Monster } from "../core/bestiary";
import { PlusCircle } from "preact-feather";
import { MonsterName } from "./MonsterName";
import { StatList } from "./StatList";

export const MonsterTile: FunctionComponent<{
    monster: Monster;
    onAdd: (id: string) => void;
}> = ({ monster, onAdd }) => (
    <li class="flex items-center px-1 py-3">
        <button
            class="h-12 focus:outline-none focus:outline-shadow hover:bg-teal-100 p-3 rounded-full text-teal-600 w-12"
            aria-label={`Add ${monster.name}`}
            onClick={() => onAdd(monster.id)}
        >
            <PlusCircle />
        </button>
        <hgroup class="w-full max-w-xs px-3">
            <MonsterName id={monster.id} name={monster.name} />
            <h4 class="leading-6 text-gray-700">
                {monster.size} {monster.type}, {monster.alignment}
            </h4>
        </hgroup>
        <StatList
            stats={[
                { id: "CR", title: "Challenge Rating", value: monster.cr },
                { id: "HP", title: "Hit Points", value: monster.hp },
                { id: "AC", title: "Armor Class", value: monster.ac },
            ]}
        />
    </li>
);
