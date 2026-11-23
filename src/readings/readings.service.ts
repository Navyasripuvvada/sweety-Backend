
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reading } from './entities/readings.entity.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
  ) {}

  async create(userId: number, dto: CreateReadingDto) {
    const existingReading = await this.readingRepository.findOne({
      where: {
        userId,
        readingDate: dto.readingDate,
        slot: dto.slot,
      },
    });

    if (existingReading) {
      throw new ConflictException(
        'A reading already exists for this date and time slot',
      );
    }

    const reading = this.readingRepository.create({
      userId,
      readingDate: dto.readingDate,
      slot: dto.slot,
      glucoseValue: dto.glucoseValue,
    });

    return this.readingRepository.save(reading);
  }

  async findAll(userId: number) {
    return this.readingRepository.find({
      where: { userId },
      order: {
        readingDate: 'DESC',
        createdAt: 'DESC',
      },
    });
  }

  async findByDate(userId: number, date: string) {
    const readings = await this.readingRepository.find({
      where: {
        userId,
        readingDate: date,
      },
      order: {
        createdAt: 'ASC',
      },
    });

    if (readings.length === 0) {
      throw new NotFoundException('No readings found for this date');
    }

    return readings;
  }

  async update(userId: number, id: number, dto: CreateReadingDto) {
    const reading = await this.readingRepository.findOne({
      where: { id, userId },
    });

    if (!reading) {
      throw new NotFoundException('Reading not found');
    }

    const duplicate = await this.readingRepository.findOne({
      where: {
        userId,
        readingDate: dto.readingDate,
        slot: dto.slot,
      },
    });

    if (duplicate && String(duplicate.id) !== String(id)) {
      throw new ConflictException(
        'A reading already exists for this date and time slot',
      );
    }

    Object.assign(reading, dto);

    return this.readingRepository.save(reading);
  }

  async remove(userId: number, id: number) {
    const reading = await this.readingRepository.findOne({
      where: { id, userId },
    });

    if (!reading) {
      throw new NotFoundException('Reading not found');
    }

    await this.readingRepository.remove(reading);

    return {
      message: 'Reading deleted successfully',
    };
  }
}
