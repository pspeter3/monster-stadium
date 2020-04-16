import { h, FunctionComponent, Fragment } from "preact";
import { useMemo } from "preact/hooks";
import { Main } from "./components/Main";
import { Monster, Bestiary } from "./core/bestiary";
import { MonsterTile } from "./MonsterTile";
import { NavBar } from "./components/NavBar";
import { Section } from "./components/Section";
import { useEncounter } from "./hooks/useEncounter";
import { Avrae } from "./components/Avrae";

export const App: FunctionComponent<{ bestiary: Bestiary }> = ({
    bestiary,
}) => {
    const [encounter, encounterDispatch] = useEncounter();
    const monsters: ReadonlyArray<Monster> = useMemo(() => {
        const results: Monster[] = [];
        for (let monster of bestiary.values()) {
            if (!monster.sources.includes("srd")) {
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
                    {monsters.map((monster) => (
                        <MonsterTile
                            key={monster.id}
                            monster={monster}
                            onAdd={(id: string) =>
                                encounterDispatch({ type: "increment", id })
                            }
                        />
                    ))}
                </Section>
            </Main>
        </Fragment>
    );
};
