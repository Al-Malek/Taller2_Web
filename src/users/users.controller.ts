// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-D  ·  Implement UsersController
// ─────────────────────────────────────────────────────────────────────────────
// Wire up ALL 5 endpoints under the '/users' path.
// Use ParseIntPipe for the :id param in every route that needs it.
//
//   GET    /users
//   GET    /users/:id
//   POST   /users          (201)
//   PATCH  /users/:id
//   DELETE /users/:id
// ─────────────────────────────────────────────────────────────────────────────

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TasksService } from '../tasks/tasks.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  @Get('search/email')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id(\\d+)/tasks')
  getUserTasks(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id);
    const tasks = this.tasksService.findAll();
    return tasks.filter((t) => t.title.toLowerCase().startsWith(user.name.toLowerCase()));
  }
  @Get(':id(\\d+)')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id(\\d+)')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id(\\d+)')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

}
