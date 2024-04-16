import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
} from 'typeorm';

export class CreateTaskTables1712547394694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
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
            name: 'status',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'doneType', // I'm flexible
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'doneAt',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'budget',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'attributes',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'varchar',
            length: '3',
            isNullable: true,
          },
          {
            name: 'publishedAt',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
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
        name: 'media',
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
            isNullable: true,
          },
          {
            name: 'url',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'featureType', // linking to tables: products, tasks, orders
            type: 'varchar',
            length: '50',
          },
          {
            name: 'featureId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
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

    await queryRunner.createTable(
      new Table({
        name: 'comments',
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
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'featureType', // linking to tables: products, tasks, orders
            type: 'varchar',
            length: '50',
          },
          {
            name: 'featureId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
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
      'tasks',
      new TableIndex({
        name: 'IDX_TASK_USER_ID_TITLE',
        columnNames: ['userId', 'title'],
      }),
    );

    await queryRunner.createIndex(
      'media',
      new TableIndex({
        name: 'IDX_MEDIA_FEATURE_ID',
        columnNames: ['featureId', 'featureType'],
      }),
    );

    await queryRunner.createIndex(
      'comments',
      new TableIndex({
        name: 'IDX_COMMENT_USER_ID_FEATURE',
        columnNames: ['userId', 'featureType'],
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE', // Adjust the delete rule as needed
      }),
    );

    await queryRunner.createForeignKey(
      'media',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE', // Adjust the delete rule as needed
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE', // Adjust the delete rule as needed
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
    await queryRunner.dropTable('media');
  }
}
