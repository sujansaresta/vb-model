import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { AccountType, Role } from '.';

//#region swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Specialty:
 *       type: object
 *       properties:
 *         otpId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         userId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         otpCode:
 *           type: string
 *         codeType:
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
  tableName: 'specialities',
  paranoid: true,
  underscored: true,
})
export default class Speciality extends Model {
  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @Column(DataType.UUID)
  roleId: Guid;

  @BelongsTo(() => AccountType)
  accountType: AccountType;

  @ForeignKey(() => AccountType)
  @Column(DataType.UUID)
  accountTypeId: Guid;

  @Column(DataType.STRING)
  specialities: string;
}

//#region Specialty Prototype

Speciality.prototype.toJSON = function () {
  const values: Speciality = { ...this.get() };
  delete values.deletedAt;

  return values;
};

//#endregion Specialty Prototype
