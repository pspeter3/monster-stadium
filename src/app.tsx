import { h, FunctionComponent } from "preact";
import { Info } from "preact-feather";

export const App: FunctionComponent = () => {
    return (
        <header class="flex items-center justify-between h-16 px-1">
            <h1 class="text-2xl tracking-tight leading-none font-semibold px-3 text-gray-900">
                Monster Stadium
            </h1>
            <a
                href="https://github.com/pspeter3/monster-stadium"
                class="w-12 h-12 flex items-center justify-center text-gray-800 hover:text-gray-50 hover:text-gray-900 rounded-full"
            >
                <Info />
            </a>
        </header>
    );
};
