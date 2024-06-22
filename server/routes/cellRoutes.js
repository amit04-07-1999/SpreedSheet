const express = require('express');
const cellController = require('../controllers/cellController');

const router = express.Router();

router.get('/cells', cellController.getAllCells);
router.post('/cells', cellController.createCell);
router.put('/cells/:id', cellController.updateCell);
router.delete('/cells/:id', cellController.deleteCell);

module.exports = router;
