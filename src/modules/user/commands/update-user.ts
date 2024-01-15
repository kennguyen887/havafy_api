import { HttpStatus, HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/global/entities/user.entity';
import { UpdateUserRequestDto } from '../dto';

import { PasswordService } from '../services/password/password.service';

export class UpdateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly data: UpdateUserRequestDto,
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const {
      userId,
      data: { firstName, lastName, password },
    } = command;

    let user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    }

    /*    if (email) {
      const existingUser = await this.usersRepository.findOne({
        where: {
          email,
          id: Not(userId),
        },
      });

      if (existingUser) {
        throw new HttpException('Email is existing.', HttpStatus.BAD_REQUEST);
      }

      user.email = email;
    }
    */

    if (firstName) {
      user = {
        ...user,
        firstName,
      };
    }

    if (lastName) {
      user = {
        ...user,
        lastName,
      };
    }

    if (password) {
      user = {
        ...user,
        passwordHash: await this.passwordService.generate(password),
      };
    }

    await this.usersRepository.save(user);
  }
}
