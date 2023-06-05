import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { PrismaService } from './database/PrismaService';
import { WorkerModule } from './worker/worker.module';
import { WorkerService } from './worker/worker.service';

@Module({
  imports: [BookModule, WorkerModule],
  controllers: [],
  providers: [PrismaService, WorkerService],
})
export class AppModule {}
