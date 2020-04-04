import { h, FunctionComponent, JSX } from "preact";

export const cx = (classes: string[]): string => classes.join(" ");

export const override = (defaults: string, overrides?: string): string =>
    overrides ? `${defaults} ${overrides}` : defaults;

export const el = <T extends EventTarget = HTMLElement>(
    as: keyof JSX.IntrinsicElements,
    classes: string[]
): FunctionComponent<JSX.HTMLAttributes<T>> => {
    const defaults = cx(classes);
    return (props) =>
        h(as, {
            ...props,
            class: override(defaults, props.class),
        } as JSX.HTMLAttributes & JSX.SVGAttributes);
};

export const Header = el("header", [
    "flex",
    "h-16",
    "items-center",
    "justify-between",
    "mb-1",
    "px-1",
]);

export const HeaderTitle = el("h1", [
    "font-semibold",
    "leading-none",
    "px-3",
    "text-2xl",
    "text-gray-800",
    "tracking-tight",
]);

export const HeaderLink = el<HTMLAnchorElement>("a", [
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
