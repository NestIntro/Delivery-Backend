import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(30)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
