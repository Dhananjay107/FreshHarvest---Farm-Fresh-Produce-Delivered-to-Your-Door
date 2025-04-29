import React, { createContext, useContext, useState } from 'react';
import { Subscription, SubscriptionOption } from '../types/product';

type SubscriptionContextType = {
  subscriptions: Subscription[];
  addSubscription: (subscription: Subscription) => void;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  cancelSubscription: (id: string) => void;
  getSubscriptionById: (id: string) => Subscription | undefined;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const addSubscription = (subscription: Subscription) => {
    setSubscriptions(prev => [...prev, subscription]);
  };

  const updateSubscription = (id: string, updates: Partial<Subscription>) => {
    setSubscriptions(prev =>
      prev.map(sub => (sub.id === id ? { ...sub, ...updates } : sub))
    );
  };

  const cancelSubscription = (id: string) => {
    updateSubscription(id, { status: 'cancelled' });
  };

  const getSubscriptionById = (id: string) => {
    return subscriptions.find(sub => sub.id === id);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        updateSubscription,
        cancelSubscription,
        getSubscriptionById,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};