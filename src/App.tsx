import { h, FunctionComponent, Fragment } from "preact";
import { useMemo } from "preact/hooks";
import { Header } from "./Header";
import { Monsters, Monster } from "./bestiary";
import { MonsterTile } from "./MonsterTile";

export const App: FunctionComponent = () => {
    const monsters: ReadonlyArray<Monster> = useMemo(
        () =>
            Monsters.filter(() => true).sort((a, b) => {
                let comp = 0;
                if (a.name < b.name) {
                    comp = -1;
                }
                if (b.name < a.name) {
                    comp = 1;
                }
                return comp;
            }),
        []
    );
    return (
        <Fragment>
            <Header />
            {monsters.map((monster) => (
                <MonsterTile
                    key={monster.id}
                    monster={monster}
                    onAdd={(_: string) => {}}
                />
            ))}
        </Fragment>
    );
};
