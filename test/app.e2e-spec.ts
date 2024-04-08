import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
        .send({ query: '{ getAllUsers { id username displayName }}' })
        .expect((res) => {
          console.log(res);
          expect(res.body.data.getAllUsers.length).toBe(0);
          expect(res.body.data.getAllUsers).toHaveLength(0);
        });
    });
  });
});
