import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AutorizathionGuard } from 'src/http/auth/autorizathion.guard';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
  ) {}

  // @Query(() => Student)
  // @UseGuards(AutorizathionGuard)
  // me(@CurrentUser() user: AuthUser) {
  //   return this.studentService.getStudentByAuthUserId(user.sub);
  // }

  @Query(() => [Student])
  @UseGuards(AutorizathionGuard)
  students() {
    return this.studentService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentService.listEnrollmentsByStudent(student.id);
  }
}
