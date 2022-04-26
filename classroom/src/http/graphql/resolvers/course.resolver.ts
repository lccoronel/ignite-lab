import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AutorizathionGuard } from 'src/http/auth/autorizathion.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { CreateInputtype } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Course])
  // @UseGuards(AutorizathionGuard)
  courses() {
    return this.courseService.listAllCourses();
  }

  @Mutation(() => Course)
  // @UseGuards(AutorizathionGuard)
  createCourse(@Args('data') data: CreateInputtype) {
    return this.courseService.createCourse(data);
  }

  @Query(() => Course)
  // @UseGuards(AutorizathionGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub);

    if (!student) throw new Error('Student not found');

    const enrollment = await this.enrollmentService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) throw new UnauthorizedException();

    return this.courseService.getCourseById(id);
  }
}
