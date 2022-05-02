import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';

export interface PurchaseCreatedPayload {
  custumer: {
    authUserId: string;
  };
  product: {
    id: string;
    title: string;
    slug: string;
  };
}

@Controller()
export class PurchaseController {
  constructor(
    private studentService: StudentService,
    private coursesService: CourseService,
    private enrollmentService: EnrollmentService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentService.getStudentByAuthUserId(
      payload.custumer.authUserId,
    );

    if (!student) {
      student = await this.studentService.createStudent({
        authUserId: payload.custumer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
