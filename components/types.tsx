// books
export interface BookListProps {
  _id: string;
  name: string;
}

// movies

export interface MovieProps {
  _id: string;
  academyAwardNominations: number;
  academyAwardWins: number;
  boxOfficeRevenueInMillions: number;
  budgetInMillions: number;
  name: string;
  rottenTomatoesScore: number;
  runtimeInMinutes: number;
}

// characters

export interface CharacterProps {
  _id: string;
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
}

// quotes

export interface SingleQuoteProps {
  _id: string;
  dialog: string;
  character: CharacterProps;
  movie: string;
}
