import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { AccountType, User } from '.';

@Table({
  timestamps: true,
  tableName: 'promo_codes',
  paranoid: true,
  underscored: true,
})
export default class PromoCode extends Model {
  @Column({
    type: DataType.TEXT,
  })
  promoId: string;

  @Column(DataType.STRING(20))
  code: string;

  @ForeignKey(() => AccountType)
  @Column(DataType.UUID)
  userTypeId: Guid;
  @BelongsTo(() => AccountType, 'userTypeId')
  userType!: AccountType;

  @Column(DataType.STRING)
  discountType: string;

  @Column(DataType.DECIMAL)
  discountValue: number;

  @Column(DataType.NUMBER)
  redeemedTimes: number;

  @Column(DataType.STRING)
  status: string;

  @Column
  expiryDate: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID
  })
  addedByAdminId: Guid;
  @BelongsTo(() => User, 'addedByAdminId')
  addedByAdmin!: User;
}

//#region PromoCode Prototype

PromoCode.prototype.toJSON = function () {
  const values: PromoCode = Object.assign({}, this.get());
  delete values.deletedAt;

  return values;
};

//#endregion PromoCode Prototype
