export interface CreditI {
  creditCard: CreditCard;
  status:     number;
}

export interface CreditCard {
  id:         string;
  userId:     string;
  cardNumber: string;
  cardName:   string;
  mount:      number;
  createdAt:  Date;
  updatedAt:  Date;
}
