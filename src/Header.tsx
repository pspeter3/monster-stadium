import { h, FunctionComponent } from "preact";
import { el } from "./utils";
import { Info } from "preact-feather";

const Root = el("header", [
    "flex",
    "h-16",
    "items-center",
    "justify-between",
    "mb-1",
    "px-1",
]);

const Title = el("h1", [
    "font-semibold",
    "leading-none",
    "px-3",
    "text-2xl",
    "text-gray-800",
    "tracking-tight",
]);

const Link = el<HTMLAnchorElement>("a", [
    "flex",
    "focus:outline-none",
    "focus:shadow-outline",
    "h-12",
    "hover:bg-teal-100",
    "hover:text-teal-600",
    "items-center",
    "justify-center",
    "rounded-full",
    "text-gray-600",
    "w-12",
]);

export const Header: FunctionComponent = () => (
    <Root>
        <Title>Monster Stadium</Title>
        <Link
            href="https://github.com/pspeter3/monster-stadium"
            aria-label="About"
        >
            <Info />
        </Link>
    </Root>
);
