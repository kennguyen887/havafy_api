import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PaypalConfig } from '../../../services/app-config/configuration';
import { VerifyPaymentRequestDto, VerifyPaymentResponseDto } from '../dto';

export class VerifyTractionPaypalPaymentCommand {
  constructor(public readonly data: VerifyPaymentRequestDto) {}
}

@CommandHandler(VerifyTractionPaypalPaymentCommand)
export class VerifyTractionPaypalPaymentCommandHandler
  implements ICommandHandler<VerifyTractionPaypalPaymentCommand>
{
  private readonly paypalConfig: PaypalConfig;

  constructor(private readonly configService: ConfigService) {
    this.paypalConfig = this.configService.get<PaypalConfig>(
      'paypalConfig',
    ) as PaypalConfig;
  }

  async execute(
    command: VerifyTractionPaypalPaymentCommand,
  ): Promise<VerifyPaymentResponseDto> {
    const { paymentGateway, orderId } = command.data;

    const token = await this.getToken();
    console.log('-----token', token);

    return {
      verified: true,
    };
  }

  async getToken(): Promise<string | undefined> {
    const auth = Buffer.from(
      `${this.paypalConfig.clientId}:${this.paypalConfig.clientSecret}`,
    ).toString('base64');
    const apiUrl =
      this.paypalConfig.clientId === 'PRODUCTION'
        ? 'https://api.paypal.com/v1/oauth2/token'
        : 'https://api.sandbox.paypal.com/v1/oauth2/token';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    };

    const data = 'grant_type=client_credentials';

    try {
      const response = await axios.post(apiUrl, data, { headers });
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.error('Error getting access token on Paypal:', error);
      throw error;
    }
  }
}
