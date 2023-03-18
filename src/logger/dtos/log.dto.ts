import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLogDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  message: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  stack: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  status: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  methodName: string;
}
