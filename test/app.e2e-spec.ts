import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { print } from 'graphql';
import { createUserMutation, getAllUsersQuery } from '../src/graphql/queries';

describe('GraphQL-server (e2e)', () => {
  let app: INestApplication;
  // beforeEach - выполняется перед каждым тестом
  // инициализировать приложение перед каждым тестом не требуется,
  // поэтому меняем beforeEach beforeAll (выполняется перед всеми тестами)
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Получение доступа к подключению к базе данных
    const dataSource = app.get(DataSource);

    //Удаление данных из БД за счёт аргумента true (синхронизация базы данных c очисткой)
    await dataSource.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    // Получение подключения к БД
    const dataSource = app.get(DataSource);
    if (dataSource) {
      //Удаление БД
      await dataSource.dropDatabase();
      // Закрытие подключения к БД
      await dataSource.destroy();
    }
    // Закрытие приложения
    await app.close();
  });

  /*  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });*/

  describe('getUsers', () => {
    it('should query getUsers and return 0 users', function () {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getAllUsersQuery) })
        .expect((res) => {
          expect(res.body.data.getAllUsers.length).toBe(0);
          expect(res.body.data.getAllUsers).toHaveLength(0);
        });
    });

    it('should create a user using createUser mutation ', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(createUserMutation),
        })
        .expect(200)
        .expect((response) => {
          expect(response.body.data.createUser).toEqual({
            id: 1,
            username: 'test',
            displayName: 'TestName',
          });
        });
    });

    it('should query getUsers and return 1 users', function () {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getAllUsersQuery) })
        .expect((res) => {
          expect(res.body.data.getAllUsers.length).toBe(1);
          expect(res.body.data.getAllUsers).toHaveLength(1);
        });
    });
  });
});
