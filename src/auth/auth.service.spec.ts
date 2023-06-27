import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

jest.mock('../user/user.service');
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should create a new user and return a success message', async () => {
      const body = {
        id: 1,
        email: 'test@example.com',
        password: 'Admin123@',
        createdAt: new Date(),
        updatedAt: new Date(),
        urls: [],
        // Add other required properties
      };

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);
      jest.spyOn(userService, 'create').mockResolvedValueOnce(body);

      const result = await authService.signUp(body);

      expect(userService.findOneByEmail).toHaveBeenCalledWith(body.email);
      expect(userService.create).toHaveBeenCalledWith(body);
      expect(result).toEqual({ message: 'Account Created Successfully' });
    });

    it('should throw a ConflictException when the email already exists', async () => {
      const body = {
        id: 1,
        email: 'test@example.com',
        password: 'Admin123@',
        createdAt: new Date(),
        updatedAt: new Date(),
        urls: [],
      };
      const existingUser = {
        id: 1,
        email: 'test@example.com',
        password: 'Admin123@',
        createdAt: new Date(),
        updatedAt: new Date(),
        urls: [],
        // Add other properties
      };

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(existingUser);

      await expect(authService.signUp(body)).rejects.toThrow(ConflictException);
      expect(userService.findOneByEmail).toHaveBeenCalledWith(body.email);
    });
  });

  describe('signIn', () => {
    it('should generate an access token for the user', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'Admin123@',
      };
      const expectedAccessToken = 'generated_access_token';

      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(expectedAccessToken);

      const result = await authService.signIn(user);

      expect(jwtService.sign).toHaveBeenCalledWith({ id: user.id });
      expect(result).toEqual({ access_token: expectedAccessToken });
    });
  });
});
