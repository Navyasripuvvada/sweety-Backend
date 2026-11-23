
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reading } from '../readings/entities/readings.entity.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
  ) {}

  async getSummary(userId: number, date?: string) {
    const query = this.readingRepository
      .createQueryBuilder('reading')
      .select('COUNT(reading.id)', 'totalReadings')
      .addSelect('AVG(reading.glucoseValue)', 'averageGlucose')
      .addSelect('MIN(reading.glucoseValue)', 'minimumGlucose')
      .addSelect('MAX(reading.glucoseValue)', 'maximumGlucose')
      .where('reading.userId = :userId', { userId });

    if (date) {
      query.andWhere('reading.readingDate = :date', { date });
    }

    const result = await query.getRawOne();

    return {
      date: date || 'All dates',
      totalReadings: Number(result.totalReadings),
      averageGlucose:
        result.averageGlucose === null
          ? null
          : Number(Number(result.averageGlucose).toFixed(2)),
      minimumGlucose:
        result.minimumGlucose === null
          ? null
          : Number(result.minimumGlucose),
      maximumGlucose:
        result.maximumGlucose === null
          ? null
          : Number(result.maximumGlucose),
    };
  }
}
