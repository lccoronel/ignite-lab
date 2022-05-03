import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { PurchaseController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [StudentService, CourseService, EnrollmentService],
})
export class MessageModule {}
