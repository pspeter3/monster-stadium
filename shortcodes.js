const fs = require("fs");
const data = require("./src/core/data.json");

/** @type Map<string, string[]> */
const acronyms = new Map();

data.monsters.forEach(({id, sources}) => {
    if (sources.includes("srd")) {
        return;
    }
    const acronym = id.split("-").map((token) => token[0]).join("");
    /** @type string[] */
    const entries = acronyms.get(acronym) || [];
    entries.push(id);
    acronyms.set(acronym, entries);
});

/** @type Map<string, string> */
const codes = new Map();

for (let [acronym, ids] of acronyms) {
    if (ids.length === 1) {
        codes.set(ids[0], acronym);
        continue;
    }
    if (acronym.length > 1) {
        console.log(acronym, ids);
    }
}
