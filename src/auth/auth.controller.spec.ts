import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/index';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should call the authService signUp method with the provided body', async () => {
      const signUpDto: SignUpDto = {
        email: 'charbel@gmail.com',
        password: 'Admin123@',
      };

      const signUpSpy = jest
        .spyOn(authService, 'signUp')
        .mockResolvedValue({ message: 'Account Created Successfully' });

      const result = await authController.signUp(signUpDto);

      expect(signUpSpy).toHaveBeenCalledWith(signUpDto);
      expect(result).toEqual({ message: 'Account Created Successfully' });
    });
  });

  describe('signIn', () => {
    it('should call the authService signIn method with the current user', async () => {
      const currentUser = {
        email: 'charbel@gmail.com',
        password: 'Admin123@',
      };

      const signInSpy = jest
        .spyOn(authService, 'signIn')
        .mockResolvedValue({ access_token: 'generated_access_token' });

      const result = await authController.signIn(currentUser);

      expect(signInSpy).toHaveBeenCalledWith(currentUser);
      expect(result).toEqual({ access_token: 'generated_access_token' });
    });
  });
});
