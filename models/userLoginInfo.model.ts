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

/**
 * @swagger
 * components:
 *   schemas:
 *     Authenticate:
 *       type: object
 *       properties:
 *         authKey:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         userId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         loggedInDatetime:
 *           type: string
 *           format: date-time
 *           example: 2016-08-29T09:12:33.001Z
 *           readOnly: true
 *         loggedOutDatetime:
 *           type: string
 *           format: date-time
 *           example: 2016-08-29T09:12:33.001Z
 *           readOnly: true
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

@Table({
  timestamps: true,
  tableName: 'user_login_info',
  underscored: true,
  paranoid: true,
})
export default class UserLoginInfo extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: Guid;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column(DataType.BOOLEAN)
  rememberMe: boolean;

  @Column(DataType.DATE)
  loggedInDatetime: Date;

  @Column(DataType.DATE)
  loggedOutDatetime: Date;

  @Column(DataType.STRING)
  loginType: string;
}

UserLoginInfo.prototype.toJSON = function () {
  const values: UserLoginInfo = { ...this.get() };
  delete values.deletedAt;

  return values;
};
