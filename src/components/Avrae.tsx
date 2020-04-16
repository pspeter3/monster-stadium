import { h, FunctionComponent } from "preact";
import { Encounter } from "../hooks/useEncounter";
import { Bestiary } from "../core/bestiary";
import { useMemo } from "preact/hooks";

export const Avrae: FunctionComponent<{
    bestiary: Bestiary;
    encounter: Encounter;
}> = ({ bestiary, encounter }) => {
    const combat = useMemo(() => {
        const lines = [
            "!multiline",
            `!init begin dyn -name "${
                encounter.name !== undefined ? encounter.name : "Encounter"
            }"`,
        ];
        const prefixes = new Set<string>();
        Object.keys(encounter.monsters)
            .sort()
            .forEach((id) => {
                const monster = bestiary.get(id);
                if (monster) {
                    let prefix = "";
                    for (let i = 1; i <= id.length; i++) {
                        prefix = id.slice(0, i);
                        if (!prefixes.has(prefix)) {
                            prefixes.add(prefix);
                            break;
                        }
                    }
                    prefix = prefix.toUpperCase();
                    const count = encounter.monsters[id];
                    if (monster.sources.includes("srd")) {
                        lines.push(
                            `!init madd "${monster.name} -n ${count} -name "${prefix}# (${monster.name})" -rollhp -group ${id}`
                        );
                    } else {
                        for (let i = 1; i <= count; i++) {
                            lines.push(
                                `!init add ${monster.init} "${prefix}${i} (${monster.name})" -h -hp ${monster.hp} -ac ${monster.ac} -group ${id}`
                            );
                        }
                    }
                }
            });
        return lines.join("\n");
    }, [bestiary, encounter]);
    return (
        <pre class="bg-gray-800 leading-6 mx-4 overflow-x-scroll px-2 py-3 rounded text-gray-400">
            {combat}
        </pre>
    );
};
