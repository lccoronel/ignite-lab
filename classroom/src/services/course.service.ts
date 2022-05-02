import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCourseParams {
  slug?: string;
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

  getCourseBySlug(slug: string) {
    return this.prismaService.course.findUnique({ where: { slug } });
  }

  async createCourse({ title, slug }: CreateCourseParams) {
    const courseSlug = slug ?? slugify(title, { lower: true });

    const courseAlrealdyExists = await this.prismaService.course.findUnique({
      where: { slug: courseSlug },
    });

    if (courseAlrealdyExists) throw new Error('Course already exists');

    return this.prismaService.course.create({
      data: { title, slug: courseSlug },
    });
  }
}
