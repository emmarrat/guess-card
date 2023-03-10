export interface User {
  username: string;
  password: string;
}

export interface PlayingCard {
  code: string;
  image: string;
  suit: string;
  value: string;
}

export interface CardData {
  cards: PlayingCard[];
}
