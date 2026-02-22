import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/auth/dto/sign-up.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByClerkId(clerkId: string) {
    return this.prisma.user.findUnique({
      where: { clerkId },
    });
  }

  async create(input: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        clerkId: input.clerkId,
        email: input.email,
        first_name: input.firstName,
        last_name: input.lastName,
        password: input.password,
      },
    });
  }

  async updateByClerkId(clerkId: string, input: Partial<CreateUserInput>) {
    return this.prisma.user.update({
      where: { clerkId },
      data: {
        email: input.email,
        first_name: input.firstName,
        last_name: input.lastName,
      },
    });
  }

  async deleteByClerkId(clerkId: string) {
    return this.prisma.user.delete({
      where: { clerkId },
    });
  }

  async upsertFromClerk(input: CreateUserInput) {
    return this.prisma.user.upsert({
      where: { clerkId: input.clerkId },
      update: {
        email: input.email,
        first_name: input.firstName,
        last_name: input.lastName,
      },
      create: {
        clerkId: input.clerkId,
        email: input.email,
        first_name: input.firstName,
        last_name: input.lastName,
      },
    });
  }
}
