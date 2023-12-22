import {
  Column,
  DataType,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export default class Setting extends Model {
  @Column(DataType.STRING(100))
  name: string;

  @Column(DataType.STRING(100))
  value: string;

  @Column(DataType.STRING(100))
  description: string;

  @Column
  settingGroup: string;
}

//#region Setting Prototype

Setting.prototype.toJSON = function () {
  const values: Setting = Object.assign({}, this.get());
  delete values.deletedAt;

  return values;
};

//#endregion Setting Prototype
