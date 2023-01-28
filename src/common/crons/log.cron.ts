import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LogCron {
  private readonly logger = new Logger(LogCron.name);
  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron(): void {
    this.logger.debug('Each 5 Seconds, I Am Called!');
  }
}
