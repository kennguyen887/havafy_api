import { HttpStatus, HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserRequestDto } from '../dto';

export class UpdateUserCommand {
  constructor(
    public readonly userId: number,
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
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const {
      userId,
      data: { email, firstName, lastName },
    } = command;

    let user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    }

    if (email) {
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

    if (firstName && lastName) {
      user = {
        ...user,
        lastName,
        firstName,
      };
    }

    await this.usersRepository.save(user);
  }
}
