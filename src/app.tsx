import { h, FunctionComponent } from "preact";
import { Route, Switch } from "wouter-preact";
import { About } from "./pages/about";
import { EncounterBuilder } from "./pages/encounter_builder";
import { EnvironmentDetail } from "./pages/environment_detail";
import { EnvironmentList } from "./pages/environment_list";
import { MonsterDetail } from "./pages/monster_detail";
import { MonsterList } from "./pages/monster_list";
import { SourceDetail } from "./pages/source_detail";
import { SourceList } from "./pages/source_list";

export const App: FunctionComponent = () => {
    return (
        <Switch>
            <Route path="/about" component={About} />
            <Route path="/monsters" component={MonsterList} />
            <Route path="/monsters/:source/:id" component={MonsterDetail} />
            <Route path="/enivornments" component={EnvironmentList} />
            <Route path="/environments/:id" component={EnvironmentDetail} />
            <Route path="/sources" component={SourceList} />
            <Route path="/sources/:id" component={SourceDetail} />
            <Route path="/" component={EncounterBuilder} />
        </Switch>
    );
};
