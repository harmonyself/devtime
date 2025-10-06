import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// 나중에 Stripe Dashboard에서 가격 ID 생성 후 여기에 입력
export const PRICE_ID = 'price_1234567890'; // Pro 플랜 가격 ID