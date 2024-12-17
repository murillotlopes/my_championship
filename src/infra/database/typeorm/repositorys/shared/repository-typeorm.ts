import { Repository } from 'typeorm';
import { Repository as IRepository } from '../../../../../core/shared/providers/repository';
import { AppDataSource } from '../../data-source';
import { BaseEntity } from '../../entities/base.entity';

export abstract class RepositoryTypeORM<M extends BaseEntity> implements IRepository<M> {

  protected repository: Repository<M>

  constructor(protected entity: any) {
    this.repository = AppDataSource.getRepository(entity)
  }

  async save(data: M,): Promise<M> {

    try {

      return await this.repository.save(data)

    } catch (error) {
      throw error
    }

  }

  async getList(): Promise<M[]> {

    try {

      return await this.repository.createQueryBuilder('m').orderBy('m.id', 'ASC').getMany()

    } catch (error) {
      throw error
    }

  }

  async getById(id: string,): Promise<M> {

    try {

      return await this.repository.createQueryBuilder('m').where('m.id = :id', { id }).getOne()

    } catch (error) {
      throw error
    }

  }

  async update(data: Partial<M>, id: string,): Promise<M> {

    try {

      const entity = await this.getById(id)
      const updatedEntity = this.repository.merge(entity, data as any)
      return await this.repository.save(updatedEntity)

    } catch (error) {
      throw error
    }

  }

  async delete(id: string,): Promise<M> {

    try {

      const deleting = await this.getById(id)
      await this.repository.delete(id)

      return deleting

    } catch (error) {
      throw error
    }

  }


} 