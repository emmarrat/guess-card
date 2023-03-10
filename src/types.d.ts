export interface User {
  username: string;
  password: string;
}

export interface PlayingCard {
  code: string;
  image: string;
  suit: 'SPADES' | 'HEARTS' | 'DIAMONDS' | 'CLUBS';
  value: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'JACK' | 'QUEEN' | 'KING' | 'ACE';
}

export interface CardData {
  cards: PlayingCard[];
}
