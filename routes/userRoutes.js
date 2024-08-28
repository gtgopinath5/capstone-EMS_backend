const express = require('express');
const userController = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

const userRouter = express.Router();

// Define the endpoints
userRouter.post('/register', userController.register); // Use '/register' for the registration endpoint
userRouter.post('/login', userController.login); // Use '/login' for the login endpoint

// Authenticated routes
userRouter.get('/me', auth.isAuth, userController.me);
userRouter.put('/me', auth.isAuth, userController.update);
userRouter.delete('/me', auth.isAuth, userController.delete);
userRouter.get('/logout', auth.isAuth, userController.logout);

// Admin routes
userRouter.get('/', auth.isAuth, auth.isAdmin, userController.getAllUsers);
userRouter.get('/:id', auth.isAuth, auth.isAdmin, userController.getUserById);
userRouter.put('/:id', auth.isAuth, auth.isAdmin, userController.updateUserById);
userRouter.delete('/:id', auth.isAuth, auth.isAdmin, userController.deleteUserById);

// Export the router
module.exports = userRouter;