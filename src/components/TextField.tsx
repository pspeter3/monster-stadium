import { h, FunctionComponent } from "preact";

export const TextField: FunctionComponent<{
    label: string;
    type: "text" | "search";
    value?: string;
    onInput: (value: string) => void;
}> = ({ label, type, value, onInput }) => (
    <div class="px-4 py-3">
        <input
            class="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 bg-white border-2 border-gray-200 focus:outline-none focus:shadow-outline focus:border-teal-600 h-12 px-2 rounded text-gray-800 w-full"
            type={type}
            aria-label={label}
            placeholder={label}
            onInput={(event) => {
                const target = event.target as HTMLInputElement;
                onInput(target.value);
            }}
            value={value}
        />
    </div>
);
