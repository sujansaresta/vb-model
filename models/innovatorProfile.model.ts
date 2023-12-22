import { Guid } from 'guid-typescript';
import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Like, User } from '.';

@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class InnovatorProfile extends Model {
  @Column(DataType.STRING(50))
  industrySector: string;

  @Column(DataType.STRING(50))
  medicalSpeciality: string;

  @Column(DataType.STRING(100))
  companyName: string;

  @Column(DataType.STRING(25))
  country: string;

  @Column(DataType.STRING(10))
  incorporationYear: string;

  @Column(DataType.STRING(50))
  progressStage: string;

  @Column(DataType.STRING(50))
  fundingStage: string;

  @Column(DataType.STRING(50))
  incorporationStatus: string;

  @Column(DataType.STRING(100))
  companyWebsite: string;

  @Column(DataType.BOOLEAN)
  isOpenForFunding: boolean;

  @Column(DataType.STRING)
  pitchDeck: string;

  @Column(DataType.STRING(1000))
  featuredImage: string;

  @Column(DataType.STRING(100))
  linkedinProfile: string;

  @Column(DataType.STRING(75))
  headline: string;

  @Column(DataType.STRING(500))
  summary: string;
  
  @Column(DataType.ARRAY(DataType.STRING()))
  approvedMarkets: string[];
  
  @Column(DataType.BOOLEAN)
  regulatoryApproval: boolean;
  
  @Column(DataType.STRING(500))
  keyPeople: string;
  
  @Column(DataType.STRING(500))
  currentProgress: string;
  
  @Column(DataType.STRING(500))
  competitiveAdvantage: string;
  
  @Column(DataType.STRING(500))
  problemSolutionSummary: string;

  @Column(DataType.ARRAY(DataType.STRING(50)))
  preferences: string[];

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
    type: DataType.UUID,
  })
  userId!: Guid;

  @BelongsTo(() => User, "userId")
  user!: User;

  @Column(DataType.INTEGER)
  likesCount: number;

  @HasMany(() => Like)
  likes: Array<Like>;

  isLiked: boolean;

  toJSON() {
    const values: InnovatorProfile = { ...this.get() };
    values.preferences ??= [];
    delete values.deletedAt;
    return values;
  }
}

export default InnovatorProfile;
