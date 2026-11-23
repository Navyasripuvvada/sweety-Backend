
import {
  IsDateString,
  IsEnum,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ReadingSlot {
  MORNING_FASTING = 'Morning fasting',
  AFTER_BREAKFAST = 'After breakfast',
  AFTER_LUNCH = 'After lunch',
  AFTER_DINNER = 'After dinner',
}

export class CreateReadingDto {
  @ApiProperty({ example: '2026-11-23' })
  @IsDateString()
  readingDate: string;

  @ApiProperty({
    enum: ReadingSlot,
    example: ReadingSlot.MORNING_FASTING,
  })
  @IsEnum(ReadingSlot)
  slot: ReadingSlot;

  @ApiProperty({ example: 110, minimum: 40, maximum: 600 })
  @IsInt()
  @Min(40)
  @Max(600)
  glucoseValue: number;
}
