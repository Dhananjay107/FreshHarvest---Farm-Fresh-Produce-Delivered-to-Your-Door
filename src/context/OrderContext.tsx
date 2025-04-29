import React, { createContext, useContext, useState } from 'react';
import { OrderStatus } from '../types/product';

type OrderContextType = {
  orders: OrderStatus[];
  updateOrderStatus: (orderId: string, status: OrderStatus['status']) => void;
  getOrderStatus: (orderId: string) => OrderStatus | undefined;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderStatus[]>([]);

  const updateOrderStatus = (orderId: string, status: OrderStatus['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status,
              timestamp: Date.now(),
            }
          : order
      )
    );
  };

  const getOrderStatus = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        updateOrderStatus,
        getOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};