import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/global/entities/user.entity';
import { CommandBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/inputs/create-user.dto';
import { PasswordService } from '../password/password.service';
import { JwtService } from '../jwt/jwt.service';
import { CreateProductUserRemainCommand } from '../../../product-usage/commands';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly commandBus: CommandBus,
  ) {}

  async isUserExists(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const userPayload = {
      email: userDto.email.toLowerCase(),
      firstName: userDto.firstName ?? null,
      lastName: userDto.lastName ?? null,
      passwordHash: await this.passwordService.generate(userDto.password),
    };

    let newUser = this.usersRepository.create(userPayload);
    newUser = await this.updateUser(newUser);

    newUser.token = this.getUserToken(newUser);
    // create product remain for new user
    await this.commandBus.execute(
      new CreateProductUserRemainCommand(newUser.id, [
        {
          sku: 'TTS-100',
          quantity: 1,
          customRemainAmount: 1000,
        },
      ]),
    );
    return await this.updateUser(newUser);
  }

  async updateUser(newUser: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(newUser);
  }

  async checkUserPassword(
    user: UserEntity,
    requestPassword: string,
  ): Promise<boolean> {
    return this.passwordService.compare(requestPassword, user.passwordHash);
  }

  public getUserToken(user: UserEntity): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email.toLowerCase(),
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  public getAll(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'lastName', 'firstName'],
    });
  }
}
