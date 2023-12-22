import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { User } from '.';

@Table({
  timestamps: true,
  tableName: 'access_profile_status_log',
  underscored: true,
})
export default class AccessProfileStatusLog extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: Guid;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column(DataType.BOOLEAN)
  isProfileSuspended : boolean;

  @Column
  profileUpdatedAt: Date;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  profileUpdatedBy: Guid;

  @BelongsTo(() => User, 'profileUpdatedBy')
  profileUpdatedByUser: User;

  @Column(DataType.BOOLEAN)
  isAccessDisabled : boolean;

  @Column
  accessUpdatedAt: Date;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  accessUpdatedBy: Guid;

  @BelongsTo(() => User, 'accessUpdatedBy')
  accessUpdatedByUser: User;
}