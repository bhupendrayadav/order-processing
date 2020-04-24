export interface IOrders {
  orderNumber: number;
  orderCreationDate: string;
  orderCompletionDate: string;
  loanNumber: string;
  lender: string;
  borrower: string;
  address: string;
  country: string;
  state: string;
  loanPurpose: string;
  loanType: string;
  FHACase: string;
  product: {
    status: string;
    marketValue: number;
    AVMStatus: string;
    product: string;
    vendor: string;
    QCScore: number;
    commennts: number;
    priorHistory: number;
    timesRejected: number;
  };
  rules: {
    totalRulesFailure: number;
    pendingDecision: number;
    usersRejected: number;
    usersPassed: number;
    coversheetRules: number;
    severityScore: number;
  };
}

export interface IOrderProcessingState {
  orders: IOrders[] | [];
}
