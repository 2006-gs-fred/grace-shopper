const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

//protection A.K.A. isAdmin
const isAdmin = (req, res, next) => {
  if (User.isAdmin === 'no') {
    const error = new Error("you can't hack us")
    res.status(401).send(error)
    return next(error)
  } else {
    next()
  }
}

const isLoggedIn = (req, res, next) => {
  if (!User) {
    const error = new Error(
      'You are not authorized to Access the requested information'
    )
    res.status(401).send(error)
    return next(error)
  } else {
    next()
  }
}

//GET --> /api/users
router.get('/', isAdmin, isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// ONLY ALLOW ADMINS AND THAT SPECIFC USER TO GET/EDIT USER FILE

//GET --> /api/users/:userId
router.get('/:userId', isAdmin, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user || User.isAdmin === 'no') {
      const err = Error('Credientials not found')
      err.status = 404
      return next(err) // or `throw err`
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
})

//PUT --> /api/users/:id
router.put('/:userId', async (req, res, next) => {
  try {
    await User.findOne({
      where: {
        id: req.params.userId
      }
    })
      .then(user => user.update(req.body))
      .then(user => {
        res.json(user)
      })
      .catch(next)
  } catch (error) {
    next(error)
  }
})

//POST --> /api.users
router.post('/', isAdmin, isLoggedIn, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})
