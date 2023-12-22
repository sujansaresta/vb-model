import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey
} from 'sequelize-typescript';
import { Guid } from 'guid-typescript';
import { InnovatorProfile, User } from '.';

@Table({
  timestamps: true,
  tableName: 'likes',
  underscored: true,
})
export default class Like extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: Guid;
  
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  likedBy: Guid;
  @BelongsTo(() => User, 'likedBy')
  likedByUser!: User;

  @ForeignKey(() => InnovatorProfile)
  @Column(DataType.UUID)
  innovatorProfileId: Guid;
  @BelongsTo(() => InnovatorProfile, 'innovatorProfileId')
  innovatorProfile!: InnovatorProfile;
}

//#region Like Prototype

Like.prototype.toJSON = function () {
  const values: Like = Object.assign({}, this.get());
  delete values.deletedAt;

  return values;
};

//#endregion Like Prototype
