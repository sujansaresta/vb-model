import { Guid } from 'guid-typescript';
import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt, ForeignKey, BelongsTo, DataType, HasMany } from 'sequelize-typescript';
import { AccountType, AdvisorAvailability, Role, User } from '.';
import { Salutation } from '@app/enums';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class AdvisorProfile extends Model {
  @Column(DataType.STRING(100))
  medicalId!: string;

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

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID
  })
  roleId!: Guid;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => AccountType)
  @Column({
    type: DataType.UUID
  })
  accountTypeId!: Guid;

  @BelongsTo(() => AccountType)
  accountType!: AccountType;

  @Column(DataType.ARRAY(DataType.STRING))
  languageProficiency: string[];

  @Column
  isPracticingClinician: boolean;

  @Column
  consultingExperience: boolean;

  @Column
  comments: string;

  @Column(DataType.ARRAY(DataType.STRING))
  specialities: string[];

  @Column({
    type: DataType.ENUM, values: [...Object.values(Salutation)]
  })
  salutation: Salutation;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  addedByAdminId: Guid;

  @BelongsTo(() => User, 'addedByAdminId')
  addedByAdmin!: User;

  @Column
  jobTitle: string;

  @Column
  contactCompany: string;

  @Column(DataType.STRING(2000))
  introduction: string;

  @Column(DataType.ARRAY(DataType.STRING))
  expertise: string[];

  @Column(DataType.STRING(100))
  linkedinUrl: string;

  @Column(DataType.STRING(1000))
  profileImage: string;

  @Column(DataType.INTEGER)
  ratePerHour: number;

  @Column(DataType.STRING(100))
  timezone: string;

  @Column(DataType.STRING(4))
  yearsOfExperience: string;

  @HasMany(() => AdvisorAvailability)
  availabilities: Array<AdvisorAvailability>;

  toJSON() {
    const values: AdvisorProfile = { ...this.get() };
    values.specialities ??= [];
    delete values.deletedAt;
    return values;
  }
}

export default AdvisorProfile;
