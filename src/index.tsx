import { h, render } from "preact";
import { App } from "./App";
import { Monsters } from "./core/bestiary";

render(<App bestiary={Monsters} />, document.body);
