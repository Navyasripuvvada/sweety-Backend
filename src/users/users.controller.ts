
import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

import { UsersService } from './users.service.js';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Get user by ID' })
@ApiResponse({ status: 200, description: 'User details retrieved successfully' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 404, description: 'User not found' })
async getUser(@Param('id', ParseIntPipe) id: number) {
  const user = await this.usersService.findById(id);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
}
