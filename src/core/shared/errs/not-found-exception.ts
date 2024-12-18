
export class NotFoundException extends Error {
  public statusCode = 404

  constructor(public message: string, public error?: any) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundException)
    }
  }

}