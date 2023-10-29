import express from 'express';
import {
    getUserByLogin,
    createUser,
    changePasswordUser,
    getAllUser,
    getUserByFace,
    logoutUser,
    getUserStatus,
    getUserById,
    
} from '../controller/UserController.js';

const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:username/:password', getUserByLogin);
router.get('/check/user/:id', getUserById)
router.get('/login/status/user/:id', getUserStatus)
router.post('/user', createUser);
router.patch('/update/user', changePasswordUser);
router.patch('/user/face', getUserByFace);
router.get('/logout/user/:id', logoutUser);

export default router;