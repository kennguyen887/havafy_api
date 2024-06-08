import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateProfileTable1717737301673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '300',
          },
          {
            name: 'jobTypes',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'workplaceTypes',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'experienceYear',
            type: 'int',
          },
          {
            name: 'countryCode',
            type: 'varchar',
            length: '5',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'reviewRate',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'expectedRate',
            type: 'decimal',
            precision: 18,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'expectedRatePer',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'experience',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'certifications',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'skills',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'languages',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'contact',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
          },

          {
            name: 'type',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'attributes',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'profiles',
      new TableIndex({
        name: 'IDX_PROFILE_USER_ID',
        columnNames: ['userId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles');
  }
}
