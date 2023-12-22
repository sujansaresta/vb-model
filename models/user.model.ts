import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { Role, AccountType, InnovatorProfile, InvestorProfile, AdvisorProfile, UserSubscription, QuestionAnswer, AccessProfileStatusLog } from '.';
import { SsoFrom } from '@app/enums';

//#region swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     ReturnUser:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         userId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         password:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         company:
 *           type: string
 *         status:
 *           type: boolean
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
 *         roleId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         role:
 *           $ref: "#/components/schemas/ReturnRole"
 *     User:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         userId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         password:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         company:
 *           type: string
 *         status:
 *           type: boolean
 *         onBoardingStage:
 *           type: string
 *         isOnBoardingCompleted:
 *           type: boolean
 *         ACN:
 *           type: string
 *         isIDVerifed:
 *           type: boolean
 *         isAuthenticatorAppEnabled:
 *           type: boolean
 *         website:
 *           type: boolean
 *         is2faEnabled:
 *           type: boolean
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
 *         roleId:
 *           type: string
 *           format: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *           readOnly: true
 *         role:
 *           $ref: "#/components/schemas/ReturnRole"
 */
//#endregion

@Table({
  timestamps: true,
  tableName: 'users',
  paranoid: true,
  underscored: true,
  modelName: 'users',
})
export default class User extends Model {
  @Column({
    type: DataType.STRING(255),
  })
  password: string;

  @Column({
    type: DataType.TEXT,
  })
  saltKey: string;

  @Column({
    type: DataType.STRING(50),
  })
  firstName: string;

  @Column({
    type: DataType.STRING(50),
  })
  middleName: string;

  @Column({
    type: DataType.STRING(50),
  })
  lastName: string;

  @Column({
    type: DataType.STRING(100),
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isEmailVerified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_sms_enabled',
  })
  isSmsEnabled: boolean;

  @Column({
    type: DataType.STRING(100),
  })
  country: string;

  @Column({
    type: DataType.STRING(10),
  })
  status: string;

  // @BelongsToMany(() => Role, () => UserRole)
  // roles: Array<Role & { UserRole: UserRole }>;

  @ForeignKey(() => Role)
  @Column(DataType.UUID)
  roleId: Guid;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => AccountType)
  @Column(DataType.UUID)
  accountTypeId: Guid;

  @BelongsTo(() => AccountType)
  accountType: AccountType;

  @Column(DataType.STRING)
  verificationCode: string;

  @Column(DataType.STRING)
  onBoardingStage: string;

  @Column({ type: DataType.DATE })
  onBoardingDateCompleted: Date;

  @Column(DataType.BOOLEAN)
  isOnBoardingCompleted: boolean;

  @Column(DataType.STRING)
  stripeCustomerId: string;

  @Column({
    type: DataType.STRING(254),
  })
  phoneNumber: string;

  @Column({
    type: DataType.TEXT,
  })
  authenticationAppCode: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isAuthenticatorAppEnabled: boolean;

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_2fa_enabled',
  })
  is2FAEnabled: boolean;

  @Column(DataType.TEXT)
  customerReferenceNumber: string;

  @HasOne(() => InvestorProfile, 'userId')
  investorProfile: InvestorProfile;

  @HasOne(() => InnovatorProfile, 'userId')
  innovatorProfile: InnovatorProfile;

  @HasOne(() => AdvisorProfile)
  advisorProfile: AdvisorProfile;

  @HasOne(() => QuestionAnswer, 'userId')
  questionAnswer: QuestionAnswer;

  @HasMany(() => AccessProfileStatusLog, 'userId')
  accessProfileStatus: AccessProfileStatusLog;

  @HasMany(() => UserSubscription)
  subscriptions: UserSubscription;

  toJWTJSON: () => User;

  @Column
  isSsoUser: boolean;

  @Column
  profileCompletedAt: Date;

  @Column(DataType.ENUM(SsoFrom.google, SsoFrom.linkedin))
  ssoFrom: string;
  roleCode?: string;
  newUserLoginInfoId?: string;
  loginType?: string;

  isAccessDisabled: boolean;
  isProfileSuspended: boolean;

  signatureId?: string;
  convesationId: Guid;
  //isAdmin(): boolean {
  //  return this.role?.code ? this.role?.code === UserRole.Admin : this.roleId === UserRoleId.Admin;
  //}
  toJSON() {
    const values: User = { ...this.get() };
    delete values.saltKey;
    delete values.password;
    delete values.deletedAt;
    delete values.verificationCode;

    return values;
  }
}

//#region User Prototype

User.prototype.toJWTJSON = function () {
  const values: User = { ...this.get() };
  delete values.saltKey;
  delete values.password;
  delete values.deletedAt;
  delete values.verificationCode;

  return values;
};

//#endregion User Prototype
