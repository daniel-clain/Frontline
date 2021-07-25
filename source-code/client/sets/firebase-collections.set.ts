
export type Collection_Type = 'Cards' | 'Players' | 'Games' | 'Factions' | 'Types' | 'Abilities' | 'Decks' | 'Game Config'

export const collectionSet = Array.from(new Set<Collection_Type>(['Cards', 'Players', 'Games', 'Factions', 'Types', 'Abilities', 'Decks', 'Game Config']))