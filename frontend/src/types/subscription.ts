export type StoredUser = {
    name: string;
    email: string;
  };
  
  export type StoredSubscription = {
    subscriptionId: string;
    userName: string;
    userEmail: string;
    subscriptionTypeId: string;
    subscriptionTypeName: string;
    subscriptionPrice: number;
    subscriptionStatus: "active";
    createdAt: string;
    startDate: string;
    renewalDate: string;
  };
  
  export type SubscriptionFormState = {
    acceptTerms: boolean;
  };