import { BracketModel } from '../../bracket/model/bracket.model';

export interface SemiFinalOutput {

  semi_final: BracketModel[]
  final: BracketModel
  third_place_playoff: BracketModel

}