import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class PrometheusService {
  private clicksCounter: Counter;

  constructor() {
    this.clicksCounter = new Counter({
      name: 'clicks_count',
      help: 'Number of clicks on short URLs',
      labelNames: ['shortUrl'],
    });
  }

  incrementClicks(shortUrl: string): void {
    this.clicksCounter.labels(shortUrl).inc(1);
  }

  getMetrics() {
    return register.metrics();
  }
}
