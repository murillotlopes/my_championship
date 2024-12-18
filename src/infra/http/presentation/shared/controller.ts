import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { ForbiddenException } from '../../../../core/shared/errs/forbidden-exception';
import { NotFoundException } from '../../../../core/shared/errs/not-found-exception';
import { UnprocessableEntityException } from '../../../../core/shared/errs/unprocessable-entity-exception';
import { BaseModel } from '../../../../core/shared/model/base.model';
import { ExtractedError } from '../../../../core/shared/types/extracted-error.type';
import { extractErrorClassValidator } from '../../../adapters/extract-error-class-validator';

export abstract class Controller {

  constructor(
    protected readonly dto?: any
  ) { }

  public init = async (req: Request, res: Response): Promise<void> => {

    try {

      if (this.dto) await this.validateInput(this.dto, req.body)

      const result = await this.execute(req)

      res.json(result)

    } catch (error) {
      const err = this.getError(error)

      res.status(err.statusCode).json(err)

    }

  }

  protected abstract execute(req: Request): Promise<unknown>

  private validateInput = async (dto: any, input: BaseModel): Promise<void> => {

    let errorExtracted: ExtractedError = {}

    if (input.created_at) errorExtracted['created_at'] = ['created_at should not be defined']
    if (input.updated_at) errorExtracted['updated_at'] = ['updated_at should not be defined']
    if (input.id) errorExtracted['id'] = ['id should not be defined']

    const prepValidate: BaseModel = plainToInstance(dto, input)

    const erros = await validate(prepValidate)

    if (erros.length || Object.keys(errorExtracted).length > 0) {

      errorExtracted = { ...errorExtracted, ...extractErrorClassValidator(erros) }

      throw new UnprocessableEntityException('Invalid payload', errorExtracted)
    }

  }

  private getError(error: Error): { message: string, statusCode: number, error?: any } {

    if (error instanceof NotFoundException) {
      return { message: error.message, error: error.error, statusCode: error.statusCode }
    }

    if (error instanceof ForbiddenException) {
      return { message: error.message, error: error.error, statusCode: error.statusCode }
    }

    if (error instanceof UnprocessableEntityException) {
      return { message: error.message, error: error.error, statusCode: error.statusCode }
    }

    return { message: error.message, statusCode: 400 }

  }

}