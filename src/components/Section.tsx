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
                <h2>
                    <button
                        class="px-1 py-3 flex items-center justify-between w-full"
                        onClick={() => setExpanded((expanded) => !expanded)}
                        aria-expanded={expanded}
                    >
                        <div class="font-semibold leading-6 px-3 text-gray-700 tracking-wide uppercase">
                            {title}
                        </div>
                        <div
                            class={`w-12 h-12 hover:bg-teal-100 hover:text-teal-600 p-3 rounded-full ${
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
