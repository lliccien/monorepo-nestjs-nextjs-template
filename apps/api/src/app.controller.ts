import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  getHello(): string {
    return 'NestJS API is running! 🚀';
  }

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      // Check database connection
      () => this.db.pingCheck('database'),
      
      // Check heap memory doesn't exceed 150MB
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      
      // Check RSS memory doesn't exceed 300MB
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
      
      // Check disk storage (50% available)
      () => this.disk.checkStorage('disk', { 
        path: '/', 
        thresholdPercent: 0.5 
      }),
    ]);
  }

  @Get('health/liveness')
  @HealthCheck()
  liveness() {
    // For Kubernetes liveness probe - just checks if app responds
    return this.health.check([]);
  }

  @Get('health/readiness')
  @HealthCheck()
  readiness() {
    // For Kubernetes readiness probe - checks critical dependencies
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}
