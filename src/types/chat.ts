export interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'agent';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  status: 'active' | 'closed';
  agentName?: string;
  startTime: number;
  endTime?: number;
}

export type AutoResponse = {
  keywords: string[];
  response: string;
};

export const AUTO_RESPONSES: AutoResponse[] = [
  {
    keywords: ['order', 'track', 'status', 'delivery'],
    response: 'You can track your order status in your account under "Order History". Need help finding it?'
  },
  {
    keywords: ['cancel', 'cancellation', 'refund'],
    response: 'To cancel an order, please go to your Order History and select "Cancel Order". Cancellations are only possible within 1 hour of placing the order.'
  },
  {
    keywords: ['subscription', 'plan', 'weekly', 'monthly'],
    response: 'Our subscription plans offer regular deliveries at a discount. You can manage your subscription in your account settings.'
  },
  {
    keywords: ['contact', 'phone', 'email', 'support'],
    response: 'You can reach our support team at support@freshharvest.com or call us at 1-800-FRESH (1-800-373-7468).'
  },
  {
    keywords: ['hours', 'time', 'open'],
    response: 'Our customer support is available Monday to Friday, 9 AM to 6 PM EST. The chatbot is available 24/7.'
  }
];