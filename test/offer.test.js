const offerController = require('../1controllers/offer.controller');
const offerModel = require('../0models/offer.js');
const httpMocks = require('node-mocks-http');
const newOffer = require('./new-offer.json');

// mock 함수
offerModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Offer Controller Create', () => {
  beforeEach(() => {
    req.body = newOffer; // req.body를 newOffer로 설정
  });

  it('Offer Controller Create function', () => {
    expect(typeof offerController.createOffer).toBe('function');
  });

  it('should call OfferModel.create', async () => {
    await offerController.createOffer(req, res, next);
    expect(offerModel.create).toBeCalledWith(newOffer);
  });

  it('should return 201 response code', async () => {
    await offerController.createOffer(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    offerModel.create.mockReturnValue(newOffer);
    await offerController.createOffer(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newOffer);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'description property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    offerModel.create.mockReturnValue(rejectedPromise);
    await offerController.createOffer(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
