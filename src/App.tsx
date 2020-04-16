import { h, FunctionComponent, Fragment } from "preact";
import { useMemo } from "preact/hooks";
import { Monsters, Monster } from "./core/bestiary";
import { MonsterTile } from "./MonsterTile";
import { NavBar } from "./components/NavBar";
import { Section } from "./components/Section";

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
            <NavBar />
            <Section title="Monsters">
                {monsters.map((monster) => (
                    <MonsterTile
                        key={monster.id}
                        monster={monster}
                        onAdd={(_: string) => {}}
                    />
                ))}
            </Section>
        </Fragment>
    );
};
