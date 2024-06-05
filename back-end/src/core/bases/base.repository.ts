import { DataSource, ObjectLiteral, ObjectType, Repository } from "typeorm";
import datasource from "../../data-source";

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  _dataSource: DataSource;

  constructor(entity: ObjectType<T>) {
    super(entity, datasource.manager);
    this._dataSource = datasource;
  }

  get dataSource(): DataSource {
    return this.dataSource;
  }
}
