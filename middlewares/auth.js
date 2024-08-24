const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');

const auth = {
    isAuth: (request, response, next) => {
        try {
            // get the token from the request cookies
            const token = request.cookies.token;

            // if the token is not present, return an error message
            if (!token) {
                return response.status(401).json({ message: 'Unauthorized' });
            }

            // verify the tokenhttps://www.postman.com/workspace/00dfd991-7d0a-46ae-8517-18ed70113c22/request/37650987-836949e9-7dee-468d-b560-0fc71a104129
            try {
                const decodedToken = jwt.verify(token, config.JWT_SECRET);

                // get the user id from the decoded token and 
                // attach it to the request object
                request.userId = decodedToken.id;

                // call the next middleware
                next();
            } catch (error) {
                response.status(401).json({ message: 'invalid token' });
            }
        } catch (error) {
            response.status(500).json({ message: error.message });  
        }
    },

    isAdmin: async (request, response, next) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user by id
            const user = await User.findById(userId);

            // if the user is not found, return an error message
            if (!user) {
                return response.status(400).json({ message: 'user not found' });
            }

            // check if the user is an admin and return an error message
            if (user.role !== 'admin') {
                return response.status(403).json({ message: 'Forbidden' });
            }

            // call the next middleware
            next();
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

// export the auth middleware
module.exports = auth;