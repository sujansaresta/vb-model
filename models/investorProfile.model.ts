import { Guid } from 'guid-typescript';
import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from '.';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class InvestorProfile extends Model {
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  medicalIdVerifiedBy: Guid;

  @BelongsTo(() => User, 'medicalIdVerifiedBy')
  medicalIdVerifiedByUser: User;

  @Column
  medicalIdVerifiedAt!: Date;

  @Column
  medicalIdStatus: string;

  //accreditation
  @BelongsTo(() => User, 'accreditationVerifiedBy')
  accreditationVerifiedByUser: User;

  @Column
  accreditationVerifiedAt!: Date;

  @Column(DataType.UUID)
  @ForeignKey(() => User)
  accreditationVerifiedBy: Guid;

  @Column
  accreditationStatus: string;

  //verified
  @Column(DataType.UUID)
  @ForeignKey(() => User)
  verifiedBy: Guid;

  @BelongsTo(() => User, 'verifiedBy')
  verifiedByUser: User

  @Column
  verifiedAt!: Date;

  @Column
  profileStatus: string

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID
  })
  userId!: Guid;

  @BelongsTo(() => User, 'userId')
  user!: User;

}

export default InvestorProfile;
