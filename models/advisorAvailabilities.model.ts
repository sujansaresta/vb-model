import { Guid } from 'guid-typescript';
import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { AdvisorProfile } from '.';

@Table({
  timestamps: true,
  tableName: 'advisor_availabilities',
  paranoid: true,
  underscored: true,
})
class AdvisorAvailability extends Model {

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt: Date;

  @ForeignKey(() => AdvisorProfile)
  @Column({
    type: DataType.UUID
  })
  advisorProfileId!: Guid;

  @BelongsTo(() => AdvisorProfile)
  advisorProfile!: AdvisorProfile;

  @Column(DataType.STRING(2000))
  availabilityWindow: string;

  @Column(DataType.STRING(2000))
  startTime: string;

  @Column(DataType.STRING(2000))
  endTime: string;

}

export default AdvisorAvailability;
