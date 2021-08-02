import { Type } from "class-transformer"
import { IsNotEmpty, IsObject, IsString, MinLength, ValidateNested } from "class-validator"

export class CreateParcelDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  trackingCode: string
}

export class KafkaCreateParcelDto {
  @Type(() => CreateParcelDto)
  @ValidateNested()
  @IsObject()
  value: CreateParcelDto
}
