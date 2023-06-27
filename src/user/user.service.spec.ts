import { UserService } from './user.service';

// Mock PrismaService
const mockPrismaService = {
  user: {
    create: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockPrismaService as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and return the created user', async () => {
      // Arrange
      const user = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      // Act
      const result = await userService.create(user);

      // Assert
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: user.email,
          password: 'hashedPassword',
        },
      });
      expect(result).toEqual(expectedUser);
    });
  });
});
