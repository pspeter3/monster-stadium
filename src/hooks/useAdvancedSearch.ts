import { Size, Type, Alignment, Environment, ChallengeRating, SourceID } from '../core/bestiary';

export interface AdvancedSearch {
    readonly pattern?: string;
    readonly sizes?: ReadonlyArray<Size>;
    readonly types?: ReadonlyArray<Type>;
    readonly alignments?: ReadonlyArray<Alignment>;
    readonly environments?: ReadonlyArray<Environment>;
    readonly cr: readonly [ChallengeRating, ChallengeRating];
    readonly lair?: true;
    readonly legendary?: true;
    readonly unique?: true;
    readonly sources: ReadonlyArray<SourceID>;
}

