
export type Collection_Type = 'Cards' | 'People' | 'Games' | 'Factions' | 'Types' | 'Abilities' | 'Decks' | 'Game Configs'

export const collectionSet = Array.from(new Set<Collection_Type>(['Cards', 'People', 'Games', 'Factions', 'Types', 'Abilities', 'Decks', 'Game Configs']))