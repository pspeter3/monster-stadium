import { h, FunctionComponent } from "preact";
import { FeatherProps } from "preact-feather/dist/types";

export const IconButton: FunctionComponent<{
    label: string;
    variant: "primary" | "secondary" | "danger";
    onClick: () => void;
    icon: FunctionComponent<FeatherProps>;
}> = ({ label, variant, onClick, icon }) => {
    const Icon = icon;
    return (
        <button
            class={`focus:outline-none focus:shadow-outline ${
                variant === "danger"
                    ? "hover:bg-red-100 hover:text-red-600"
                    : "hover:bg-teal-100 hover:text-teal-600"
            } h-12 p-3 rounded-full ${
                variant === "primary" ? "text-teal-600" : "text-gray-600"
            } w-12`}
            aria-label={label}
            onClick={onClick}
        >
            <Icon />
        </button>
    );
};
