import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class DrawMatchesInputDto {

  @IsArray()
  @ArrayMaxSize(16)
  @ArrayMinSize(16)
  @IsString({ each: true })
  teams!: string[]

}