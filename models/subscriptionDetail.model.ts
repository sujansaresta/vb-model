import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { SubscriptionPlan } from '.';

@Table({
  timestamps: true,
  tableName: 'subscription_detail',
  paranoid: true,
  underscored: true,
})
export default class SubscriptionDetail extends Model {

  @ForeignKey(() => SubscriptionPlan)
  @Column(DataType.UUID)
  subscriptionPlanId: Guid;
  @BelongsTo(() => SubscriptionPlan, 'subscriptionPlanId')
  subscriptionPlan: SubscriptionPlan;

  @Column(DataType.TEXT)
  subscriptionText: string;

  @Column
  sortOrder: number;
}

//#region SubscriptionDetail Prototype

SubscriptionDetail.prototype.toJSON = function () {
  const values: SubscriptionDetail = Object.assign({}, this.get());
  delete values.deletedAt;

  return values;
};

//#endregion SubscriptionDetail Prototype
