import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class DrawMatchesInputDto {

  @IsArray()
  @ArrayMaxSize(8)
  @ArrayMinSize(8)
  @IsString({ each: true })
  teams!: string[]

}