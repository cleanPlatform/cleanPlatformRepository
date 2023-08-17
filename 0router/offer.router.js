const express = require('express');
const router = express.Touter();

const OfferController = require('../1controllers/offer.controller');
const offerController = new OfferController();

const authMiddleware = require('../middlewares/');

router.post('/companies/:companyId/offer', offerController.createOffer);
router.get('/companies/:companyId/offer', offerController.referOffer);
router.put('/companies/:companyId/offer/:offerId', offerController.updateOffer);
router.delete('/companies/:companyId/offer/:offerId', offerController.deleteOffer);

module.exports = router;
