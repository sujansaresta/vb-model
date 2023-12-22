import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { AccountType, SubscriptionDetail } from '.';
import { Guid } from 'guid-typescript';

@Table({
  timestamps: true,
  tableName: 'subscription_plans',
  underscored: true,
  paranoid: true,
})
export default class SubscriptionPlan extends Model {
  @Column(DataType.STRING(100))
  name: string;

  @Column(DataType.STRING(100))
  title: string;

  @Column(DataType.STRING)
  currency: string;

  @Column(DataType.BOOLEAN)
  isOneTimePayment: boolean;

  @Column(DataType.INTEGER)
  perAnnum: number;

  @Column(DataType.INTEGER)
  perLifetime: number;

  @Column(DataType.INTEGER)
  perMonth: number;

  @Column(DataType.STRING)
  stripePricingId: string;

  @HasMany(() => SubscriptionDetail)
  subscriptionDetail: Array<SubscriptionDetail>;

  @ForeignKey(() => AccountType)
  @Column(DataType.UUID)
  accountTypeId: Guid;

  @BelongsTo(() => AccountType, 'accountTypeId')
  accountType: AccountType;

  @Column
  sortOrder: number;
}

