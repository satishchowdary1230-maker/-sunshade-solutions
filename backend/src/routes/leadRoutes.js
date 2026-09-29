const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/stream', leadController.streamLeads);
router.get('/', leadController.getLeads);
router.post('/', leadController.createLead);
router.patch('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
