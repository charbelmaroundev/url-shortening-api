// import { Test, TestingModule } from '@nestjs/testing';
// import { UrlController } from './url.controller';
// import { UrlService } from './url.service';
// import { CreateUrlDto, UrlCodeDto } from './dto';
// import { IUser } from 'src/models';

// describe('UrlController', () => {
//   let urlController: UrlController;
//   let urlService: UrlService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UrlController],
//       providers: [UrlService],
//     }).compile();

//     urlController = module.get<UrlController>(UrlController);
//     urlService = module.get<UrlService>(UrlService);

//     describe('create', () => {
//       it('should call urlService.create with the correct parameters', () => {
//         // Arrange
//         const createUrlDto: CreateUrlDto = {
//           longUrl: 'https://translate.google.com/',
//         };
//         const user: IUser = {
//           email: 'charbel@gmail.com',
//           password: 'Admin123@',
//         };

//         // Act
//         urlController.create(createUrlDto, user);

//         // Assert
//         expect(urlService.create).toHaveBeenCalledWith(createUrlDto, user);
//       });
//     });

//     describe('findAll', () => {
//       it('should call urlService.findAll with the correct parameter', () => {
//         // Arrange
//         const user: IUser = {
//           email: 'charbel@gmail.com',
//           password: 'Admin123@',
//         };

//         // Act
//         urlController.findAll(user);

//         // Assert
//         expect(urlService.findAll).toHaveBeenCalledWith(user);
//       });
//     });

//     describe('findClicksNumber', () => {
//       it('should call urlService.findClicksNumber with the correct parameters', () => {
//         // Arrange
//         const param: UrlCodeDto = {
//           code: 'ABCDEF',
//         };
//         const user: IUser = {
//           email: 'charbel@gmail.com',
//           password: 'Admin123@',
//         };

//         // Act
//         urlController.findClicksNumber(param, user);

//         // Assert
//         expect(urlService.findClicksNumber).toHaveBeenCalledWith(param, user);
//       });
//     });

//     describe('remove', () => {
//       it('should call urlService.remove with the correct parameters', () => {
//         // Arrange
//         const param: UrlCodeDto = {
//           code: 'ABCDEF',
//         };
//         const user: IUser = {
//           email: 'charbel@gmail.com',
//           password: 'Admin123@',
//         };

//         // Act
//         urlController.remove(param, user);

//         // Assert
//         expect(urlService.remove).toHaveBeenCalledWith(param, user);
//       });
//     });
//   });
// });
