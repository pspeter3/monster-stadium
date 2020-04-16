import { h, FunctionComponent } from "preact";

export const Main: FunctionComponent = ({ children }) => (
    <main class="lg:grid grid-cols-2 gap-2 relative" children={children} />
);
