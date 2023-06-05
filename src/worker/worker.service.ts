import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';

@Injectable()
export class WorkerService {
  private worker: Worker;
  private num = 0;
  private numPromise: Promise<number>;
  private numResolve: (value: number) => void;

  constructor() {
    this.startWorker();
  }

  startWorker(): void {
    this.worker = new Worker('./dist/worker/my.worker.js');

    // Escute as mensagens enviadas pelo worker
    this.worker.on('message', (message) => {
      this.num = message;
      if (this.numResolve) {
        this.numResolve(message);
        this.numResolve = null;
        this.numPromise = null;
      }
    });

    // Lida com erros do worker
    this.worker.on('error', (error) => {
      console.error('Worker error:', error);
    });

    // Lida com a finalização do worker
    this.worker.on('exit', (code) => {
      console.log('Worker exited with code', code);
    });
  }

  getNum(): Promise<number> {
    if (!this.numPromise) {
      this.numPromise = new Promise<number>((resolve) => {
        this.numResolve = resolve;
      });
    }
    return this.numPromise;
  }
}
