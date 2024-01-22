import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
} from 'typeorm';

export class CreateProductAndOrderTables1705309225616
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '300',
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '150',
            isUnique: true,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'basePrice',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: [
              'draft',
              'for_review',
              'approved',
              'rejected',
              'active',
              'inactive',
              'pending',
            ],
            default: "'pending'",
          },
          {
            name: 'productType',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'varchar',
            length: '3',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'attributes',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'isHidden',
            type: 'boolean',
            default: false,
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

    await queryRunner.createIndex(
      'products',
      new TableIndex({
        name: 'IDX_PROUDUCT_USER_ID',
        columnNames: ['userId'],
      }),
    );

    // ---  create order tables  ---
    await queryRunner.createTable(
      new Table({
        name: 'orders',
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
            name: 'subtotal',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'grandTotal',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'discountTotal',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'taxAmount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'paymentOrderId',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'promoCode',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'promoDiscount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'paymentStatus',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'shippingMethod',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'paymentMethod',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'paymentAddress',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'shippingAddress',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'varchar',
            length: '3',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['canceled', 'pending', 'completed', 'in_delivery'],
            default: "'pending'",
          },
          {
            name: 'attributes',
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

    // Add foreign key constraint
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE', // Adjust the delete rule as needed
      }),
    );

    await queryRunner.createIndex(
      'orders',
      new TableIndex({
        name: 'IDX_ORDER_USER_ID',
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'orderId',
            type: 'uuid',
          },
          {
            name: 'productId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'basePrice',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'attributes',
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

    // Add foreign key constraint
    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE', // Adjust the delete rule as needed
      }),
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE', // Adjust the delete rule as needed
      }),
    );

    await queryRunner.createIndex(
      'order_items',
      new TableIndex({
        name: 'IDX_ORDER_ITEM_ORDER_ID',
        columnNames: ['orderId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
    await queryRunner.dropTable('orders');
    await queryRunner.dropTable('order_items');
  }
}
