import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { User } from '.';

//#region swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     OTP:
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
  tableName: 'otp',
  paranoid: true,
  underscored: true,
})
export default class OTP extends Model {
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: Guid;

  @Column(DataType.STRING)
  otpCode: string;

  @Column({
    type: DataType.TEXT,
  })
  codeType: string;

  @Column(DataType.BOOLEAN)
  isValid: boolean;
}

//#region OTP Prototype

OTP.prototype.toJSON = function () {
  const values: OTP = Object.assign({}, this.get());
  delete values.deletedAt;
  delete values.otpCode;

  return values;
};

//#endregion OTP Prototype
