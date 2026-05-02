const express = require('express');
const router = express.Router();
const { create, getAll, getOne, update, remove } = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, authorize('admin'), create);
router.put('/:id', protect, authorize('admin'), update);
router.delete('/:id', protect, authorize('admin'), remove);

module.exports = router;
