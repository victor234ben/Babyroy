const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { verifyTelegram, connectWallet } = require('../controllers/verifyTaskController')

const router = express.Router()
router.use(protect)

router.post('/tasks/verify/telegram', verifyTelegram)
router.post('/tasks/verify/connect', connectWallet)

module.exports = router