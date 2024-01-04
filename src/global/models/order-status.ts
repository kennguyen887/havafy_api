export enum OrderStatus {
  PENDING = 'pending',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  IN_DELIVERY = 'in_delivery',
}

export enum PaymentStatus {
  PENDING = 'pending',
  CANCELED = 'canceled',
  SUCCESS = 'success',
  FAILED = 'failed',
  PAY_TO_PARTNER = 'pay_to_partner',
}

export enum DeliveryStatus {
  PENDING = 'pending',
  CANCELED = 'canceled',
  SHIPPING = 'shipping',
  SHIPPED = 'shipped',
}
