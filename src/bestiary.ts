import data from "./data.json";

export type SourceID =
    | "oota"
    | "pota"
    | "basic-rules"
    | "hotdq"
    | "mm"
    | "phb"
    | "skt"
    | "cos"
    | "tftyp"
    | "rot"
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
    readonly alignment: Alignment;
    readonly environments: ReadonlyArray<Environment>;
    readonly cr: ChallengeRating;
    readonly ac: number;
    readonly hp: number;
    readonly init: number;
    readonly legendary: boolean;
    readonly unique: boolean;
    readonly srd: false;
    readonly sources: ReadonlyArray<SourceID>;
}

export const Sources: ReadonlyArray<Source> = data.sources as Source[];
export const Monsters: ReadonlyArray<Monster> = data.monsters as Monster[];
