
import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Request,
  UseGuards,
  Put,
  Delete,
  Param,
  ParseIntPipe
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

import { ReadingsService } from './readings.service.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('Blood Glucose Readings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a blood glucose reading' })
  @ApiResponse({ status: 201, description: 'Reading created successfully' })
  @ApiResponse({ status: 409, description: 'Duplicate reading' })
  async create(
    @Request() req: { user: { userId: number } },
    @Body() createReadingDto: CreateReadingDto,
  ) {
    return this.readingsService.create(
      req.user.userId,
      createReadingDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all readings or filter by date' })
  @ApiResponse({ status: 200, description: 'Readings retrieved successfully' })
  async findAll(
    @Request() req: { user: { userId: number } },
    @Query('date') date?: string,
  ) {
    if (date) {
      return this.readingsService.findByDate(req.user.userId, date);
    }

    return this.readingsService.findAll(req.user.userId);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update a blood glucose reading' })
  @ApiResponse({ status: 200, description: 'Reading updated successfully' })
  async update(
    @Request() req: { user: { userId: number } },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateReadingDto,
  ) {
    return this.readingsService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blood glucose reading' })
  @ApiResponse({ status: 200, description: 'Reading deleted successfully' })
  async remove(
    @Request() req: { user: { userId: number } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.readingsService.remove(req.user.userId, id);
  }

}
