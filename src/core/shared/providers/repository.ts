
export interface Repository<M> {

  save(data: M): Promise<M>
  getList(): Promise<M[]>
  getById(id: unknown): Promise<M | undefined>
  update(data: Partial<M>, id: unknown): Promise<M | undefined>
  delete(id: unknown): Promise<M | undefined>

}