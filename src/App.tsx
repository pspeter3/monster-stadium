import { h, FunctionComponent, Fragment } from "preact";
import { useMemo } from "preact/hooks";
import { Avrae } from "./components/Avrae";
import { Bestiary, Monster } from "./core/bestiary";
import { Main } from "./components/Main";
import { MonsterTile } from "./components/MonsterTile";
import { NavBar } from "./components/NavBar";
import { Section } from "./components/Section";
import { useEncounter } from "./hooks/useEncounter";

export const App: FunctionComponent<{ bestiary: Bestiary }> = ({
    bestiary,
}) => {
    const [encounter, encounterDispatch] = useEncounter();
    const monsters: ReadonlyArray<Monster> = useMemo(() => {
        const results: Monster[] = [];
        for (let monster of bestiary.values()) {
            if (monster.sources.includes("srd")) {
                results.push(monster);
            }
        }
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
    }, [bestiary]);
    return (
        <Fragment>
            <NavBar />
            <Main>
                <div>
                    <Section title="Encounter">
                        <pre class="px-4 leading-6">
                            {JSON.stringify(encounter, null, 2)}
                        </pre>
                    </Section>
                    <Section title="Avrae">
                        <Avrae bestiary={bestiary} encounter={encounter} />
                    </Section>
                </div>
                <Section title="Monsters">
                    <ul>
                        {monsters.map((monster) => (
                            <MonsterTile
                                key={monster.id}
                                monster={monster}
                                onAdd={(id: string) =>
                                    encounterDispatch({ type: "increment", id })
                                }
                            />
                        ))}
                    </ul>
                </Section>
            </Main>
        </Fragment>
    );
};
