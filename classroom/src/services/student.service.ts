import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

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
}
