import data from "./data.json";

export type SourceID =
    | "basic-rules"
    | "cos"
    | "hotdq"
    | "mm"
    | "oota"
    | "phb"
    | "pota"
    | "rot"
    | "skt"
    | "srd"
    | "tftyp"
    | "vgtm";

export interface Source {
    readonly id: SourceID;
    readonly name: string;
}

export type Size =
    | "Tiny"
    | "Small"
    | "Medium"
    | "Large"
    | "Huge"
    | "Gargantuan";

export const Sizes = new Set<Size>([
    "Tiny",
    "Small",
    "Medium",
    "Large",
    "Huge",
    "Gargantuan",
]);

export type Type =
    | "Aberration"
    | "Beast"
    | "Celestial"
    | "Construct"
    | "Dragon"
    | "Elemental"
    | "Fey"
    | "Fiend"
    | "Giant"
    | "Humanoid"
    | "Monstrosity"
    | "Ooze"
    | "Plant"
    | "Undead";

export const Types = new Set<Type>([
    "Aberration",
    "Beast",
    "Celestial",
    "Construct",
    "Dragon",
    "Elemental",
    "Fey",
    "Fiend",
    "Giant",
    "Humanoid",
    "Monstrosity",
    "Ooze",
    "Plant",
    "Undead",
]);

export type Alignment =
    | "Any"
    | "Any Chaotic"
    | "Any Evil"
    | "Chaotic Evil"
    | "Chaotic Good"
    | "Chaotic Neutral"
    | "Lawful Evil"
    | "Lawful Good"
    | "Lawful Neutral"
    | "Neutral"
    | "Neutral Evil"
    | "Neutral Good"
    | "Non-good"
    | "Non-lawful"
    | "Unaligned";

export const Alignments = new Set<Alignment>([
    "Any",
    "Any Chaotic",
    "Any Evil",
    "Chaotic Evil",
    "Chaotic Good",
    "Chaotic Neutral",
    "Lawful Evil",
    "Lawful Good",
    "Lawful Neutral",
    "Neutral",
    "Neutral Evil",
    "Neutral Good",
    "Non-good",
    "Non-lawful",
    "Unaligned",
]);

export type Environment =
    | "Aquatic"
    | "Arctic"
    | "Cave"
    | "Coast"
    | "Desert"
    | "Dungeon"
    | "Forest"
    | "Grassland"
    | "Mountain"
    | "Planar"
    | "Ruins"
    | "Swamp"
    | "Underground"
    | "Urban";

export const Environments = new Set<Environment>([
    "Aquatic",
    "Arctic",
    "Cave",
    "Coast",
    "Desert",
    "Dungeon",
    "Forest",
    "Grassland",
    "Mountain",
    "Planar",
    "Ruins",
    "Swamp",
    "Underground",
    "Urban",
]);

export type ChallengeRating =
    | 0
    | 0.125
    | 0.25
    | 0.5
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 26
    | 30;

export const ChallengeRatings = new Set<ChallengeRating>([
    0,
    0.125,
    0.25,
    0.5,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    26,
    30,
]);

export interface Monster {
    readonly id: string;
    readonly name: string;
    readonly size: Size;
    readonly type: Type;
    readonly alignment: Alignment;
    readonly environments: ReadonlyArray<Environment>;
    readonly cr: ChallengeRating;
    readonly hp: number;
    readonly ac: number;
    readonly init: number;
    readonly lair: boolean;
    readonly legendary: boolean;
    readonly unique: boolean;
    readonly sources: ReadonlyArray<SourceID>;
}

export type Bestiary = ReadonlyMap<string, Monster>;

export const Sources: ReadonlyArray<Source> = data.sources as Source[];
export const Monsters: Bestiary = new Map(
    data.monsters.map((monster) => [monster.id, monster as Monster])
);
