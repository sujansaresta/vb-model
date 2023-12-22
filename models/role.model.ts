import {
  Table,
  Model,
  Column,
  DataType,
  Unique,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { AccountType, Speciality, User } from '.';

//#region swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     ReturnRole:
 *       type: object
 *       properties:
 *         roleId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         description:
 *           type: string
 *         code:
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
 *     Role:
 *       type: object
 *       properties:
 *         roleId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         description:
 *           type: string
 *         code:
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
 *         users:
 *           type: array
 *           readOnly: true
 *           items:
 *             $ref: "#/components/schemas/User"
 */
//#endregion

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export default class Role extends Model {
  @HasMany(() => User)
  users: Array<User>;

  @HasMany(() => Speciality)
  Specialities: Array<Speciality>;

  @Column(DataType.STRING(100))
  description: string;

  @Unique
  @Column(DataType.STRING(24))
  code: string;

  @ForeignKey(() => AccountType)
  @Column(DataType.UUID)
  accountTypeId: Guid;

  @BelongsTo(() => AccountType)
  accountType: AccountType;

  @HasMany(() => Speciality)
  specialities: Speciality;
}

//#region Role Prototype

Role.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.deletedAt;

  return values;
};

//#endregion Role Prototype
