import { h, FunctionComponent } from "preact";
import { Info } from "preact-feather";

export const NavBar: FunctionComponent = () => (
    <header class="px-1 py-3 flex items-center justify-between">
        <h1 class="font-semibold leading-none px-3 tracking-tight text-2xl text-gray-800">
            Monster Stadium
        </h1>
        <a
            href="https://github.com/pspeter3/monster-stadium"
            aria-label="About"
            class="w-12 h-12 p-3 focus:outline-none focus:shadow-outline hover:bg-teal-100 hover:text-teal-600 text-gray-600"
        >
            <Info />
        </a>
    </header>
);
