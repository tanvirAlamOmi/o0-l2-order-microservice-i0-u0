import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, IsEmail, IsPhoneNumber, IsArray } from "class-validator";

export class OrderDto {
    @IsString()
    @IsNotEmpty()
    customerId: string;
  
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    productIds: string[];
  
    @IsString()
    @IsNotEmpty()
    status: string;
}