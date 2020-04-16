import { h, FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { ChevronUp, ChevronDown } from "preact-feather";

export const Section: FunctionComponent<{ title: string }> = ({
    title,
    children,
}) => {
    const [expanded, setExpanded] = useState(true);
    const Icon = expanded ? ChevronUp : ChevronDown;
    return (
        <section>
            <header>
                <h2 class="px-1 py-3">
                    <button
                        class="flex focus:outline-none focus:shadow-outline items-center h-12 justify-between rounded w-full"
                        onClick={() => setExpanded((expanded) => !expanded)}
                        aria-expanded={expanded}
                    >
                        <div class="dark:text-gray-500 font-semibold leading-6 px-3 text-gray-700 tracking-wide uppercase">
                            {title}
                        </div>
                        <div
                            class={`dark:hover:bg-blue-900 hover:bg-blue-100 hover:text-blue-600 h-12 p-3 rounded-full w-12 ${
                                expanded ? "text-blue-600" : "text-gray-600"
                            }`}
                        >
                            <Icon aria-hidden="true" focusable="false" />
                        </div>
                    </button>
                </h2>
            </header>
            {expanded ? children : null}
        </section>
    );
};
