import { HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ResetPasswordRequestDto } from '../dto';
import { UserService } from '../services/user/user.service';
import { PasswordService } from '../services/password/password.service';
import { GCloud } from '../../services/app-config/configuration';

export class ResetPasswordCommand {
  constructor(public readonly data: ResetPasswordRequestDto) {}
}

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  private readonly gcloud: GCloud;

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.gcloud = this.configService.get<GCloud>('gcloud') as GCloud;
  }

  async execute(command: ResetPasswordCommand): Promise<{ email: string }> {
    const {
      data: { email },
    } = command;

    return {
      email,
    };
  }
}
