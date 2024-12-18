
export class ForbiddenException extends Error {
  public statusCode = 403

  constructor(public message: string, public error?: any) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenException)
    }
  }



}