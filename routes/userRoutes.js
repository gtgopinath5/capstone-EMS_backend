//import the express router
const express = require('express');

//import the usercontroller
const userController=require('../controllers/userControllers')
const auth=require('../middlewares/auth')
//import the express router
const userRouter = express.Router();

//define the endpoints
userRouter.post('/register', userController.register); // Use '/register' for the registration endpoint
userRouter.post('/login', userController.login); // Use '/login' for the login endpoint

//authenticated route
userRouter.get('/me',auth.isAuth,userController.me)
userRouter.put('/me',auth.isAuth,userController.update)
userRouter.delete('/me',auth.isAuth,userController.delete)
userRouter.get('/logout',auth.isAuth,userController.logout)

//admin route
userRouter.get('/',auth.isAuth,auth.isAdmin,userController.getAllUsers)
userRouter.get('/:id', auth.isAuth, auth.isAdmin, userController.getUserById);
userRouter.put('/:id', auth.isAuth, auth.isAdmin, userController.updateUserById);
userRouter.delete('/:id', auth.isAuth, auth.isAdmin, userController.deleteUserById);

//export the router
module.exports = userRouter;