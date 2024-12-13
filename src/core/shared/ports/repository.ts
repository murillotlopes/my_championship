
export interface Repository<T> {

  save(data: T): Promise<T>
  getList(param: unknown): Promise<T[]>
  getById(id: unknown): Promise<T | undefined>
  update(data: Partial<T>, id: unknown): Promise<T | undefined>
  delete(id: unknown): Promise<void>

}