import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from '../services/app-config/configuration';

// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const {
          database: { host, port, password, user, dbName },
        } = getConfig();

        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          autoLoadEntities: true,
          logging: 'all',
          // namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),
  ],
})
export class DbModule {}
