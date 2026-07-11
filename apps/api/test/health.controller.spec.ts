import { Test } from '@nestjs/testing';
import { HealthController } from '../src/health/health.controller';

describe('HealthController', () => {
  it('reports the service as healthy', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();
    const response = moduleRef.get(HealthController).check();
    expect(response.service).toBe('store-api');
    expect(response.status).toBe('ok');
    expect(Number.isNaN(Date.parse(response.timestamp))).toBe(false);
  });
});
