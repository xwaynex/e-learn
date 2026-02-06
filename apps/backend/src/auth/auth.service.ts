import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    // check if user exists
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    // create user

    const newUser = await this.userService.create({
      email: dto.email,
      password: passwordHash,
    });

    // return token
    return this.generateToken(newUser.id, newUser.email);
  }

  async signIn(dto: SignInDto) {
    // find user
    const user = await this.userService.findByEmail(dto.email);

    // We check user.password specifically to handle the "string | null" type
    const storedPassword = user?.password as string | null;

    // validate user and password
    if (
      !user ||
      !storedPassword ||
      !(await bcrypt.compare(dto.password, storedPassword))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //return token
    return this.generateToken(user.id, user.email);
  }

  private async generateToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
