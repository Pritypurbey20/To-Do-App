const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')
const auth = require('../auth')

// or const router = require('express').Router()

router.post('/signin',controller.signin)
router.post('/login',controller.login)
router.post('/task',auth,controller.create_task)
router.get('/task',auth,controller.all_task)
router.put('/update/:taskId',auth,controller.update_task)
router.delete('/delete/:taskId',auth,controller.delete_task)

module.exports = router


