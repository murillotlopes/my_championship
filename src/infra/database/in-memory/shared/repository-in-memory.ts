import { randomUUID } from 'node:crypto';
import { BaseModel } from '../../../../core/shared/model/base.model';
import { Repository } from '../../../../core/shared/providers/repository';

export abstract class RepositoryInMemory<M extends BaseModel> implements Repository<M> {

  protected list: M[] = []

  async save(data: M): Promise<M> {

    data.id = randomUUID()
    data.created_at = new Date()
    data.updated_at = data.created_at

    this.list.push(data)

    return data

  }

  async getList(): Promise<M[]> {
    return this.list
  }

  async getById(id: string): Promise<M | undefined> {

    const item = this.list.find(item => item.id === id)

    if (!item) return

    return item

  }

  async update(data: Partial<M>, id: string): Promise<M | undefined> {

    const idx = this.list.findIndex(item => item.id === id)

    if (!idx) return

    const oldData = this.list[idx]

    data.updated_at = new Date()

    const newData = Object.assign({}, oldData, data)

    this.list.splice(idx, 1, newData)

    return newData

  }

  async delete(id: string): Promise<M | undefined> {

    const idx = this.list.findIndex(item => item.id === id)

    if (!idx) return

    const willBeDeleted = this.list[idx]

    this.list.splice(idx, 1)

    return willBeDeleted

  }

}