import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateStudentService {
  authUserId: string;
}

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  listAllStudents() {
    return this.prismaService.student.findMany();
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prismaService.student.findUnique({ where: { authUserId } });
  }

  getStudentById(id: string) {
    return this.prismaService.student.findUnique({ where: { id } });
  }

  createStudent({ authUserId }: CreateStudentService) {
    return this.prismaService.student.create({ data: { authUserId } });
  }
}
