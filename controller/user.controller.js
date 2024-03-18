import { getUserById } from '../service/user.service.js';

const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await getUserById(id);
    res.send(user);
};

export { getUser };
