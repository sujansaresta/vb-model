import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table
export default class Organization extends Model<Organization> {
  @Column
  name!: string;

  @Column
  type!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
}


// import { Guid } from 'guid-typescript';
// import {
//   Column,
//   DataType,
//   PrimaryKey,
//   Table,
//   Model
// } from 'sequelize-typescript';

// @Table({
//   timestamps: true,
//   underscored: true,
//   paranoid: true,
// })
// export default class Organization extends Model {
//   @PrimaryKey
//   @Column({
//     type: DataType.UUID,
//
//   })
//   id: Guid;

//   @Column(DataType.STRING)
//   name: string;

//   @Column(DataType.STRING(250))
//   type: string;
// }
