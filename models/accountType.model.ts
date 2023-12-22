import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import User from './user.model';
import Role from './role.model';
import { UserAccountType } from '@app/enums';

//#region swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     AccountType:
 *       type: object
 *       properties:
 *         accountTypeId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         userId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         type:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2016-08-29T09:12:33.001Z
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2016-08-29T09:12:33.001Z
 *           readOnly: true
 *         user:
 *           $ref: "#/components/schemas/User"
 */
//#endregion

@Table({
  timestamps: true,
  //tableName: 'AccountTypes',
  paranoid: true,
  underscored: true,
})
export default class AccountType extends Model {
  @HasMany(() => User)
  users: Array<User>;

  @HasMany(() => Role)
  roles: Array<Role>;

  @Column({
    type: DataType.STRING(255),
  })
  type: UserAccountType;

  //@HasMany(() => PayeeTypeAccountType)
  //payeeTypeAccountTypes: Array<PayeeTypeAccountType>;

  //@BelongsToMany(() => PayeeType, () => PayeeTypeAccountType)
  //payeeTypes: PayeeType[];
}

//#region AccountType Prototype

AccountType.prototype.toJSON = function () {
  const values: AccountType = Object.assign({}, this.get());
  delete values.deletedAt;

  return values;
};

//#endregion AccountType Prototype
