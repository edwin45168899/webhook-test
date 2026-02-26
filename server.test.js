const request = require('supertest');
const app = require('./server');

describe('Webhook Server', () => {
  describe('GET /health', () => {
    it('should return ok status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });

    it('should include X-Request-ID header', async () => {
      const res = await request(app).get('/health');
      expect(res.headers['x-request-id']).toBeDefined();
    });
  });

  describe('POST /test', () => {
    it('should return ok with received message', async () => {
      const res = await request(app).post('/test').send({ alert: 'test' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok', message: 'received' });
    });

    it('should include X-Request-ID header', async () => {
      const res = await request(app).post('/test').send({});
      expect(res.headers['x-request-id']).toBeDefined();
    });
  });

  describe('404', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/unknown');
      expect(res.status).toBe(404);
    });
  });
});
