const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "CPAG3",
        email: "admin@cpag.org.nz",
        whatsapp: "093025260",
        city: "new zealand",
        uf: "nz"
      })
    
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});