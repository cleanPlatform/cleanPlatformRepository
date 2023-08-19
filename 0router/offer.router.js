const express = require('express');
const router = express.Router();

const OfferController = require('../1controllers/offer.controller');
const offerController = new OfferController();

// const authMiddleware = require('../middlewares/');

//router.post('/companies/:companyId/offer', offerController.createOffer); 기존 api
router.post('/companies', offerController.createOffer); // 서비스 생성
// router.get('/companies/:companyId/offer', offerController.referOffer); // 기존 api

// router.put('/companies/:companyId/offer/:offerId', offerController.putOffer); 기존 api
router.put('/companies/:offerId', offerController.putOffer); // 서비스 수정

// router.delete('/companies/:companyId/offer/:offerId', offerController.deleteOffer); 기존 api
router.delete('/companies/:offerId', offerController.deleteOffer); // 서비스 삭제

router.get('/companies', offerController.getOffer); // 전체 조회

router.get('/companies/:offerId', offerController.onlyget); // 상세 조회

module.exports = router;
