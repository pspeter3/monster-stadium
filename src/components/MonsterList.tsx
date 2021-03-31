import { h, FunctionComponent, Fragment } from "preact";
import { useMemo, useState } from "preact/hooks";
import { Bestiary, Monster } from "../core/bestiary";
import { MonsterTile } from "./MonsterTile";
import { TextField } from "./TextField";

const Limit = 20;

export const MonsterList: FunctionComponent<{
    bestiary: Bestiary;
    onAdd: (id: string) => void;
}> = ({ bestiary, onAdd }) => {
    const [filter, setFilter] = useState("");
    const monsters: ReadonlyArray<Monster> = useMemo(() => {
        const pattern = filter !== "" ? new RegExp(filter, "i") : null;
        const results: Monster[] = [];
        for (let monster of bestiary.values()) {
            if (
                (monster.sources.includes("srd") ||
                    monster.sources.includes("mm")) &&
                (pattern === null || monster.name.match(pattern))
            ) {
                results.push(monster);
            }
        }
        /* istanbul ignore next */
        return results.sort((a, b) => {
            let comp = 0;
            if (a.name < b.name) {
                comp = -1;
            }
            if (b.name < a.name) {
                comp = 1;
            }
            return comp;
        });
    }, [bestiary, filter]);
    return (
        <Fragment>
            <TextField
                label="Search"
                type="search"
                value={filter}
                onInput={setFilter}
            />
            <div class="px-4 py-3">
                <h3 class="dark:bg-gray-800 dark:text-gray-500 bg-gray-200 font-semibold leading-6 px-2 py-3 rounded text-center text-gray-700 w-full">
                    Showing {Math.min(monsters.length, Limit)} of{" "}
                    {monsters.length}
                </h3>
            </div>
            <ul>
                {monsters.slice(0, Limit).map((monster) => (
                    <MonsterTile
                        key={monster.id}
                        monster={monster}
                        onAdd={onAdd}
                    />
                ))}
            </ul>
        </Fragment>
    );
};
