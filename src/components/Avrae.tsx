import { h, FunctionComponent, Fragment } from "preact";
import { Encounter } from "../hooks/useEncounter";
import { Bestiary } from "../core/bestiary";
import { useMemo } from "preact/hooks";
import { Copy } from "preact-feather";

export const Avrae: FunctionComponent<{
    bestiary: Bestiary;
    encounter: Encounter;
}> = ({ bestiary, encounter }) => {
    const combat = useMemo(() => {
        const lines = [
            "!multiline",
            `!init begin dyn turnnotif -name "${
                encounter.name !== "" ? encounter.name : "Encounter"
            }"`,
        ];
        Object.keys(encounter.monsters)
            .sort()
            .forEach((id) => {
                const monster = bestiary.get(id);
                if (monster) {
                    const count = encounter.monsters[id];
                    lines.push(
                        `!init madd "${monster.name}" -n ${count} -rollhp -group ${id}`
                    );
                }
            });
        return lines.join("\n");
    }, [bestiary, encounter]);
    return (
        <Fragment>
            <pre class="bg-gray-800 leading-6 mx-4 overflow-x-scroll px-2 py-3 rounded text-gray-400">
                {combat}
            </pre>
            <div class="px-4 py-3">
                <button
                    class="dark:border-gray-700 dark:text-gray-500 dark:hover:bg-teal-900 dark:hover:text-teal-500 border-2 border-gray-200 focus:outline-none focus:shadow-outline focus:border-teal-600 font-bold hover:bg-teal-100 hover:border-teal-600 hover:text-teal-700 flex items-center justify-center h-12 rounded text-gray-700 w-full"
                    onClick={() => navigator.clipboard.writeText(combat)}
                >
                    <Copy />
                    <span class="leading-6 px-3 tracking-wide uppercase">
                        Copy
                    </span>
                </button>
            </div>
        </Fragment>
    );
};
