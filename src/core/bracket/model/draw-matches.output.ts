import { BracketModel } from './bracket.model';

export interface DrawMatchesOutput extends Omit<BracketModel, 'id' | 'created_at' | 'updated_at' | 'championship'> {

}
