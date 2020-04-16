import { h, FunctionComponent } from "preact";
import { Monster } from "../core/bestiary";
import { PlusCircle } from "preact-feather";
import { MonsterName } from "./MonsterName";
import { StatList } from "./StatList";
import { IconButton } from "./IconButton";

export const MonsterTile: FunctionComponent<{
    monster: Monster;
    onAdd: (id: string) => void;
}> = ({ monster, onAdd }) => (
    <li class="flex items-center px-1 py-3">
        <IconButton
            label={`Add ${monster.name}`}
            variant="primary"
            onClick={() => onAdd(monster.id)}
            icon={PlusCircle}
        />
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
