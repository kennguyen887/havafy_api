import { HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PaypalConfig } from '../../../services/app-config/configuration';

import { VerifyPaymentRequestDto, VerifyPaymentResponseDto } from '../dto';

enum PaypalOrderIntent {
  CAPTURE = 'CAPTURE',
  AUTHORIZE = 'AUTHORIZE',
}

enum PaypalOrderStatus {
  CREATED = 'CREATED',
  SAVED = 'SAVED',
  APPROVED = 'APPROVED',
  VOIDED = 'VOIDED',
  COMPLETED = 'COMPLETED',
  PAYER_ACTION_REQUIRED = 'PAYER_ACTION_REQUIRED',
}

interface PaypalOrderResponse {
  id: string;
  intent: PaypalOrderIntent;
  status: PaypalOrderStatus;
}

export class VerifyTractionPaypalPaymentCommand {
  constructor(public readonly data: VerifyPaymentRequestDto) {}
}

@CommandHandler(VerifyTractionPaypalPaymentCommand)
export class VerifyTractionPaypalPaymentCommandHandler
  implements ICommandHandler<VerifyTractionPaypalPaymentCommand>
{
  private readonly paypalConfig!: PaypalConfig;
  private readonly orderApiUrl!: string;
  private readonly tokenApiUrl!: string;

  constructor(private readonly configService: ConfigService) {
    this.paypalConfig = this.configService.get<PaypalConfig>(
      'paypal',
    ) as PaypalConfig;

    if (this.paypalConfig.mode === 'PRODUCTION') {
      this.orderApiUrl = 'https://api.paypal.com/v2/checkout/orders';
      this.tokenApiUrl = 'https://api.paypal.com/v1/oauth2/token';
    }
    if (this.paypalConfig.mode === 'SANDBOX') {
      this.orderApiUrl = 'https://api.sandbox.paypal.com/v2/checkout/orders';
      this.tokenApiUrl = 'https://api.sandbox.paypal.com/v1/oauth2/token';
    }
  }

  async execute(
    command: VerifyTractionPaypalPaymentCommand,
  ): Promise<VerifyPaymentResponseDto> {
    const { orderId } = command.data;

    const token = await this.getToken();
    if (!token) {
      throw new HttpException(
        'Have problem on the Paypal Connection.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const order = await this.getOrderDetails(orderId, token);
    if (!order) {
      throw new HttpException(
        'Order not found on Paypal.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      order.intent == PaypalOrderIntent.CAPTURE &&
      order.status === PaypalOrderStatus.COMPLETED
    ) {
      return {
        verified: true,
      };
    }
    return {
      verified: false,
    };
  }

  async getOrderDetails(
    orderId: string,
    accessToken: string,
  ): Promise<PaypalOrderResponse | null> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.get(`${this.orderApiUrl}/${orderId}`, {
        headers,
      });
      const orderDetails = response.data;
      return orderDetails;
    } catch (error) {
      console.error('Error getting order details:', error);
    }
    return null;
  }

  async getToken(): Promise<string | undefined> {
    const auth = Buffer.from(
      `${this.paypalConfig.clientId}:${this.paypalConfig.clientSecret}`,
    ).toString('base64');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    };

    const data = 'grant_type=client_credentials';

    try {
      const response = await axios.post(this.tokenApiUrl, data, { headers });
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.error('Error getting access token on Paypal:', error);
      throw error;
    }
  }
}
