import { Controller, Get } from '@nestjs/common';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get('start')
  startWorker(): string {
    this.workerService.startWorker();
    return 'Worker started';
  }

  @Get('worker/num')
  getWorkerNum() {
    return this.workerService.getNum();
  }
}
