import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { SubscriptionPlan, User, UserTransaction } from '.';

@Table({
  timestamps: true,
  tableName: 'user_subscriptions',
  paranoid: true,
  underscored: true,
})
export default class UserSubscription extends Model {
 
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: Guid;
  
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

  @Column(DataType.STRING)
  stripeSubscriptionId: string;

  @HasMany(() => UserTransaction)
  userTransactions: Array<UserTransaction>;

  startBillingCycle: Date;
  
  endBillingCycle: Date;

  billingCurrency: string;
  
  paymentMethod: Object;
}

//#region UserSubscription Prototype

UserSubscription.prototype.toJSON = function () {
  const values: UserSubscription = Object.assign({}, this.get());
  delete values.deletedAt;

  return values;
};

//#endregion UserSubscription Prototype
