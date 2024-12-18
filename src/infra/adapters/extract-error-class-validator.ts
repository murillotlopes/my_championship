import { ValidationError } from 'class-validator';
import { ExtractError } from '../../core/shared/providers/extractError';
import { ExtractedError } from '../../core/shared/types/extracted-error.type';

export const extractErrorClassValidator: ExtractError = (errors: ValidationError[]) => {

  const errorExtracted: ExtractedError = {}

  for (const error of errors) {
    const field = error.property
    errorExtracted[field] = Object.values(error.constraints as Object) as any
  }

  return errorExtracted

}