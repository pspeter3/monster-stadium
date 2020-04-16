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
                        class="h-12 flex focus:outline-none focus:shadow-outline items-center justify-between rounded w-full"
                        onClick={() => setExpanded((expanded) => !expanded)}
                        aria-expanded={expanded}
                    >
                        <div class="font-semibold leading-6 px-3 text-gray-700 tracking-wide uppercase">
                            {title}
                        </div>
                        <div
                            class={`w-12 h-12 hover:bg-blue-100 hover:text-blue-600 p-3 rounded-full ${
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
