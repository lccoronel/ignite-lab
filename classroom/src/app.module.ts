import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [DatabaseModule, HttpModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
