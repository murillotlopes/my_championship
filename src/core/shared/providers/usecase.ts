
export interface UseCase {
  execute(input: unknown): Promise<unknown>
}