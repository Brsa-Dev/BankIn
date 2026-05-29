import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        // Vérifier si l'email existe déjà
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (existing) throw new ConflictException('Email déjà utilisé');

        // Hasher le mot de passe
        const passwordHash = await bcrypt.hash(dto.password, 10);

        // Créer l'utilisateur
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
            }
        });

        return this.signToken(user.id, user.email);
    }

    async login(dto: LoginDto) {
        // Trouver l'utilisateur
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user) throw new UnauthorizedException('Identifiants invalides');

        // Vérifier le mot de passe
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid) throw new UnauthorizedException('Identifiants invalides');

        return this.signToken(user.id, user.email);
    }

    private signToken(userId: number, email: string) {
        const token = this.jwt.sign({ userId, email });
        return { access_token: token };
    }
}