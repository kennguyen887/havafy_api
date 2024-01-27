import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
} from 'typeorm';

export class UserProductUsage1706333246844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_user_usage',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'productType',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'productUsageType',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'usageAmount',
            type: 'int',
          },
          {
            name: 'payloadRequest',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'outputResult',
            type: 'json',
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
    await queryRunner.createTable(
      new Table({
        name: 'product_user_remain',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'productName',
            type: 'varchar',
            length: '300',
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'productType',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'productUsageType',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'remainAmount',
            type: 'int',
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
      'product_user_usage',
      new TableIndex({
        name: 'IDX_PROUDUCT_USER_USAGE_USER_ID',
        columnNames: ['userId', 'productType'],
      }),
    );

    await queryRunner.createIndex(
      'product_user_remain',
      new TableIndex({
        name: 'IDX_PROUDUCT_USER_REMAIN_USER_ID',
        columnNames: ['userId', 'productType'],
      }),
    );

    await queryRunner.createForeignKey(
      'product_user_usage',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE', // Adjust the delete rule as needed
      }),
    );

    await queryRunner.createForeignKey(
      'product_user_remain',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE', // Adjust the delete rule as needed
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_user_remain');
    await queryRunner.dropTable('product_user_usage');
  }
}
