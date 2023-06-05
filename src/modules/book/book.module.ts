import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/database/PrismaService';
import { WorkerService } from 'src/worker/worker.service';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService, WorkerService],
})
export class BookModule {}
