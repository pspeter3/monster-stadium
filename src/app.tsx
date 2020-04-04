import { h, FunctionComponent } from "preact";
import { Info } from "preact-feather";
import { Header, HeaderTitle, HeaderLink } from "./elements";

export const App: FunctionComponent = () => {
    return (
        <Header>
            <HeaderTitle>Monster Stadium</HeaderTitle>
            <HeaderLink
                href="https://github.com/pspeter3/monster-stadium"
                aria-label="About"
            >
                <Info />
            </HeaderLink>
        </Header>
    );
};
