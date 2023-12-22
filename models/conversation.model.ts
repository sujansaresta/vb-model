import { Guid } from 'guid-typescript';
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export default class Conversation extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: Guid;

  @Column
  initialMessage: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user1Id: string;

  @BelongsTo(() => User, 'user1Id')
  user1: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user2Id: string;

  @BelongsTo(() => User, 'user2Id')
  user2: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  initiatedById: string;

  @BelongsTo(() => User, 'initiatedById')
  initiatedBy: User;

  @Column
  status: string;

  @Column
  systemMessageId: string;
}

//#region Conversation Prototype

Conversation.prototype.toJSON = function () {
  const values: Conversation = { ...this.get() }
  delete values.deletedAt;
  return values;
};

//#endregion Conversation Prototype
