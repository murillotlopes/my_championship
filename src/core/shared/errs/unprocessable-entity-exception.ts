
export class UnprocessableEntityException extends Error {
  public statusCode = 422

  constructor(public message: string, public error?: any) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnprocessableEntityException)
    }
  }

}