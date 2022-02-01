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

// quotes

export interface SingleQuoteProps {
  _id: string;
  dialog: string;
  character: string;
  movie: string;
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
