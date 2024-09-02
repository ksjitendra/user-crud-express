const request = require('supertest');
const app = require('../app');
const userModel = require('../models/user');

jest.mock('../models/user', () => ({
  findByPk: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
}));


describe('GET /v1/user/:id', () => {
  it('should return 200 and user details when the user is found', async () => {
      const user = { id: 1, name: 'John Doe' };
      userModel.findByPk.mockResolvedValue(user);

      const res = await request(app).get('/v1/user/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
          message: "User details fetched successfully",
          data: user
      });
  });

  it('should return 400 and an error message when the user is not found', async () => {
      userModel.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/v1/user/1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
          message: "User not found",
          data: null
      });
  });

  it('should return 400 and an error message when there is an error in fetching user details', async () => {
      userModel.findByPk.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/v1/user/1');

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
          message: "Getting trouble in fetching user details",
          data: null,
          error: 'Database error'
      });
  });
});

describe('POST /v1/save/user', () => {
  afterEach(() => {
      jest.clearAllMocks(); // Clear any previous mocks
  });

  it('should create a new user and return 201', async () => {
      const newUser = {
          name: 'John Doe',
          email: 'john+2@example.com',
          role: 'admin'
      };

      // Mock the database interaction
      userModel.create.mockResolvedValue(newUser);

      const response = await request(app)
          .post('/v1/save/user')
          .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created successfully');
      expect(userModel.create).toHaveBeenCalledWith(newUser);
  });
});
