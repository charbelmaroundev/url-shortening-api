// import { PrometheusService } from './prometheus.service';
// import { Counter, register } from 'prom-client';

// describe('PrometheusService', () => {
//   let prometheusService: PrometheusService;

//   beforeEach(() => {
//     prometheusService = new PrometheusService();
//   });

//   afterEach(() => {
//     // Reset the prometheus registry after each test
//     register.clear();
//   });

//   it('should increment clicks counter', async () => {
//     const shortUrl = 'https://example.com/abc';

//     prometheusService.incrementClicks(shortUrl);

//     // Get the clicks counter metric
//     const clicksCounter = prometheusService['clicksCounter'] as Counter;

//     // Assert that the counter value has been incremented
//     expect(await clicksCounter.get()).toMatchObject([{ value: 1 }]);
//     expect(await clicksCounter.labels({ shortUrl }).get()).toMatchObject([
//       { value: 1 },
//     ]);
//   });

//   it('should return metrics', () => {
//     const metrics = prometheusService.getMetrics();

//     // Assert that metrics are returned
//     expect(metrics).toBeDefined();
//     expect(metrics).toContain('clicks_count');
//   });
// });
