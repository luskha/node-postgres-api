import { getUser } from '../controller/user.controller.js';

const userRoutes = (app) => {
    app.get('/user/:id', getUser);
};

export default userRoutes;
