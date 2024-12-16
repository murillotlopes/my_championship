import { ExtractedError } from '../types/extracted-error.type';

export interface ExtractError {
  (errors: any[]): ExtractedError
}