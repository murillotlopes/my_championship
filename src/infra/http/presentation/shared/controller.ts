import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
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

    } catch (error: any) {

      //TODO: criar um gerenciador de erro que devolva o status correto e valide se erro.message é objeto e transforma-lo
      res.status(400).json({
        msg: 'failed to process your request',
        error: error['message']
      })

    }

  }

  protected abstract execute(req: Request): Promise<unknown>

  private validateInput = async (dto: any, input: BaseModel): Promise<void> => {

    let errorExtracted: ExtractedError = {}

    if (input.created_at) errorExtracted['created_at'] = ['created_at should not be defined']
    if (input.updated_at) errorExtracted['updated_at'] = ['updated_at should not be defined']

    const prepValidate: BaseModel = plainToInstance(dto, input)

    const erros = await validate(prepValidate)

    if (erros.length || Object.keys(errorExtracted).length > 0) {

      errorExtracted = { ...errorExtracted, ...extractErrorClassValidator(erros) }

      throw new Error(errorExtracted as any)
    }

  }

}