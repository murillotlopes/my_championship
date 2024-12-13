import { randomUUID } from 'node:crypto';
import { ChampionshipModel } from '../../../core/championship/model/championship.model';
import { Repository } from '../../../core/shared/ports/repository';

export default class ChampionshipRepositoryInMemory implements Repository<ChampionshipModel> {

  private list: ChampionshipModel[] = []


  async save(data: ChampionshipModel): Promise<ChampionshipModel> {

    data.id = randomUUID()
    data.created_at = new Date()
    data.updated_at = data.created_at

    this.list.push(data)

    return data
  }

  async getList(param?: unknown): Promise<ChampionshipModel[]> {
    return this.list
  }

  async getById(id: unknown): Promise<ChampionshipModel | undefined> {
    return this.list.find(item => item.id === id)
  }

  async update(data: Partial<ChampionshipModel>, id: unknown): Promise<ChampionshipModel | undefined> {

    const idx = this.list.findIndex(item => item.id === id)
    const oldData = this.list[idx]

    if (!idx) return

    const newData = Object.assign({}, oldData, data)

    this.list.splice(idx, 1, newData)

    return newData

  }

  async delete(id: unknown): Promise<void> {

    const idx = this.list.findIndex(item => item.id === id)

    this.list.splice(idx, 1)

  }

}