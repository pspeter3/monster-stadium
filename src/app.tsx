import { h, FunctionComponent } from "preact";
import { Route, Switch } from "wouter-preact";
import { About } from "./pages/About";
import { EncounterBuilder } from "./pages/EncounterBuilder";
import { EnvironmentDetail } from "./pages/EnvironmentDetail";
import { EnvironmentList } from "./pages/EnvironmentList";
import { MonsterDetail } from "./pages/MonsterDetail";
import { MonsterList } from "./pages/MonsterList";
import { SourceDetail } from "./pages/SourceDetail";
import { SourceList } from "./pages/SourceList";

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
