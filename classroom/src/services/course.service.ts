import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  listAllCourses() {
    return this.prismaService.course.findMany();
  }

  getCourseById(id: string) {
    return this.prismaService.course.findUnique({ where: { id } });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });

    const courseAlrealdyExists = await this.prismaService.course.findUnique({
      where: { slug },
    });

    if (courseAlrealdyExists) throw new Error('Course already exists');

    return this.prismaService.course.create({ data: { title, slug } });
  }
}
