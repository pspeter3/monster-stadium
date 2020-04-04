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
