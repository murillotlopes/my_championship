
export interface Repository<M> {

  save(data: M): Promise<M>
  getList(): Promise<M[]>
  getById(id: unknown): Promise<M>
  update(data: Partial<M>, id: unknown): Promise<M>
  delete(id: unknown): Promise<void>

}