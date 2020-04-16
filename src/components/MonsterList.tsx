import { h, FunctionComponent, Fragment } from "preact";
import { useMemo } from "preact/hooks";
import { Bestiary, Monster } from "../core/bestiary";
import { MonsterTile } from "./MonsterTile";
import { useAdvancedSearch } from "../hooks/useAdvancedSearch";
import { TextField } from "./TextField";

export const MonsterList: FunctionComponent<{
    bestiary: Bestiary;
    onAdd: (id: string) => void;
}> = ({ bestiary, onAdd }) => {
    const [search, dispatch] = useAdvancedSearch();
    const monsters: ReadonlyArray<Monster> = useMemo(() => {
        const pattern =
            search.pattern !== "" ? new RegExp(search.pattern, "i") : null;
        const results: Monster[] = [];
        for (let monster of bestiary.values()) {
            if (
                monster.sources.includes("srd") &&
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
    }, [bestiary, search]);
    return (
        <Fragment>
            <TextField
                label="Search"
                type="search"
                value={search.pattern}
                onInput={(pattern) => dispatch({ type: "pattern", pattern })}
            />
            <ul>
                {monsters.map((monster) => (
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
