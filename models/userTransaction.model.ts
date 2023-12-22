import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { PromoCode, SubscriptionPlan, User, UserSubscription } from '.';
import { SubscriptionStatus } from '@app/enums';

@Table({
  timestamps: true,
  tableName: 'user_transactions',
  paranoid: true,
  underscored: true,
})
export default class UserTransaction extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: Guid;

  @ForeignKey(() => UserSubscription)
  @Column(DataType.UUID)
  userSubscriptionId: Guid;
  @BelongsTo(() => UserSubscription, 'userSubscriptionId')
  userSubscription: UserSubscription;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: Guid;
  @BelongsTo(() => User, 'userId')
  user: User;

  @ForeignKey(() => SubscriptionPlan)
  @Column(DataType.UUID)
  subscriptionPlanId: Guid;
  @BelongsTo(() => SubscriptionPlan, 'subscriptionPlanId')
  subscriptionPlan: SubscriptionPlan;

  @ForeignKey(() => PromoCode)
  @Column(DataType.UUID)
  promoCodeId: Guid;
  @BelongsTo(() => PromoCode, 'promoCodeId')
  promoCode: PromoCode;

  @Column(DataType.STRING)
  stripeInvoiceId: string;

  @Column(DataType.DECIMAL)
  subscriptionAmount: number;

  @Column(DataType.DECIMAL)
  paidAmount: number;

  @Column(DataType.DECIMAL)
  discountAmount: number;

  @Column(DataType.STRING)
  status: SubscriptionStatus;
}

//#region UserTransaction Prototype

UserTransaction.prototype.toJSON = function () {
  const values: UserTransaction = Object.assign({}, this.get());
  delete values.deletedAt;

  return values;
};

//#endregion UserTransaction Prototype
