import { h, FunctionComponent, Fragment } from "preact";
import { Avrae } from "./components/Avrae";
import { Bestiary } from "./core/bestiary";
import { EncounterEditor } from "./components/EncounterEditor";
import { Main } from "./components/Main";
import { MonsterList } from "./components/MonsterList";
import { NavBar } from "./components/NavBar";
import { Section } from "./components/Section";
import { useEncounter } from "./hooks/useEncounter";

export const App: FunctionComponent<{ bestiary: Bestiary }> = ({
    bestiary,
}) => {
    const [encounter, dispatch] = useEncounter();
    return (
        <Fragment>
            <NavBar />
            <Main>
                <div>
                    <Section title="Encounter">
                        <EncounterEditor
                            bestiary={bestiary}
                            encounter={encounter}
                            dispatch={dispatch}
                        />
                    </Section>
                    <Section title="Avrae">
                        <Avrae bestiary={bestiary} encounter={encounter} />
                    </Section>
                </div>
                <Section title="Monsters">
                    <MonsterList
                        bestiary={bestiary}
                        onAdd={(id) => dispatch({ type: "increment", id })}
                    />
                </Section>
            </Main>
        </Fragment>
    );
};
