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

@Table({
  timestamps: true,
  tableName: 'question_answers',
  underscored: true,
  paranoid: true,
})
export default class QuestionAnswer extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: Guid;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column(DataType.STRING)
  industrySector: string;

  @Column(DataType.STRING)
  medicalSpeciality: string;

  @Column(DataType.ARRAY(DataType.STRING))
  platformUsage: string[];

  @Column(DataType.STRING)
  investorType: string;

  @Column(DataType.STRING)
  investorTypeOther: string;

  @Column(DataType.STRING)
  organizationRepresented: string;

  @Column(DataType.STRING)
  investmentIndustry: string;

  @Column(DataType.STRING)
  investmentIndustryOther: string;

  @Column(DataType.ARRAY(DataType.STRING))
  investmentStage: string[];

  @Column(DataType.STRING)
  investmentPerDeal: string;

  @Column(DataType.STRING)
  linkedinUrl: string;
}

QuestionAnswer.prototype.toJSON = function () {
  const values: QuestionAnswer = { ...this.get() };
  delete values.deletedAt;

  return values;
};
