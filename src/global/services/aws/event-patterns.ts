import { Nullable, getRunTimeName } from 'src/global/utils';

export const EVENT_PATTERNS = {
  order: {
    create: 'order-create',
    paymentSchedule: 'payment-schedule',
  },
  refund: {
    create: 'refund-create',
  },
  search: {
    productSync: 'sync-product-data',
    catalogChanged: 'catalog-changed',
    campaignChanged: 'campaign-changed',
  },
  staff: {
    update: 'staff-update',
  },
  consumer: {
    answerForm: 'consumer-answer-form',
  },
  payment: {
    update: 'payment-update',
  },
  recommendation: {
    timeBased: 'recommendation-time-based',
    userProgress: 'recommendation-user-progress',
  },
  program: {
    createActionItems: 'program-create-action-items',
    participantJoin: 'program-participant-join',
    hsgEvents: 'program-hsg-events-completed',
  },
  appointment: {
    create: 'appointment-create',
    cancelled: 'appointment-cancelled',
    vaccinationFulfilled: 'vaccination-fulfilled',
    onsiteFulfilled: 'onsite-fulfilled',
    export: 'appointment-export',
  },
  product: {
    productFormLinked: 'product-form-linked',
  },
};

export const AWS_TOPIC_PATTERNS = {
  CONSUMER_ANSWER_FORM: 'consumer-answer-form',
  CONSUMER_UPDATE_PROFILE: 'consumer-update-profile',
  ORDER_CREATED: 'order-created',
  EVENT_CONSUMER_ATTENDED: 'event-consumer-attended',
  APPOINTMENT_CANCELLED: 'appointment-cancelled',
};

type KeyAwsSqsPattern =
  (typeof AWS_TOPIC_PATTERNS)[keyof typeof AWS_TOPIC_PATTERNS];

export const AWS_SQS_PATTERNS: Record<
  KeyAwsSqsPattern,
  Record<string, string>
> = {
  [AWS_TOPIC_PATTERNS.CONSUMER_ANSWER_FORM]: {
    recommendation: 'consumer-answer-form-recommendation',
    healthRecord: 'consumer-answer-form-health-record',
    quest: 'consumer-answer-form-quest',
  },
  [AWS_TOPIC_PATTERNS.CONSUMER_UPDATE_PROFILE]: {
    recommendation: 'consumer-update-profile-recommendation',
    wallet: 'consumer-update-profile-wallet',
  },
  [AWS_TOPIC_PATTERNS.EVENT_CONSUMER_ATTENDED]: {
    quest: 'event-consumer-attended-quest',
  },
};

export const REDIS_PUB_SUB = {
  appointment: {
    updated: 'appointment-updated',
  },
};

export function getTopicName(topic: string): string {
  return `${getRunTimeName()}-${topic}`;
}

export function getQueueName(event: string): string {
  return `${getRunTimeName()}-${event}`;
}

export function parseMessagePayload(body: string): any {
  try {
    const data = JSON.parse(body);

    // parse payload for SNS case
    if (data.Type === 'Notification') {
      return JSON.parse(data.Message)?.payload || null;
    }

    return data.payload || null;
  } catch (ex) {
    return null;
  }
}

export function parsePayloadEventBridge<Data = unknown>(
  body: string,
): Nullable<Data> {
  try {
    return JSON.parse(body);
  } catch (ex) {
    return null;
  }
}
