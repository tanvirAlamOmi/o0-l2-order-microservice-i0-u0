import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDto {
    @IsString()
    @IsOptional()
    customerId?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @IsOptional()
    productIds?: string[];

    @IsString()
    @IsOptional()
    status?: string;
}