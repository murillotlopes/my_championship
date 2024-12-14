import { randomUUID } from 'node:crypto';
import { Repository } from '../../../core/shared/ports/repository';
import { TeamModel } from '../../../core/team/model/team.model';

export default class TeamRepositoryInMemory implements Repository<TeamModel> {

  private list: TeamModel[] = []

  async save(data: TeamModel): Promise<TeamModel> {

    data.id = randomUUID()
    data.created_at = new Date()
    data.updated_at = data.created_at

    this.list.push(data)

    return data
  }

  async getList(param: unknown): Promise<TeamModel[]> {
    return this.list
  }

  async getById(id: string): Promise<TeamModel | undefined> {
    return this.list.find(item => item.id === id)
  }

  async update(data: Partial<TeamModel>, id: string): Promise<TeamModel | undefined> {

    const idx = this.list.findIndex(item => item.id === id)
    const oldData = this.list[idx]

    if (!idx) return

    const newData = Object.assign({}, oldData, data)

    this.list.splice(idx, 1, newData)

    return newData

  }

  async delete(id: string): Promise<void> {

    const idx = this.list.findIndex(item => item.id === id)

    this.list.splice(idx, 1)

  }

}