export interface Encounter {
    readonly name?: string;
    readonly monsters: Readonly<Record<string, number>>;
}
