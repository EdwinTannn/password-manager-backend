import express from "express";

import{
    createApp,
    deleteApp,
    getAllApp,
    getAppById,
    getAppByUserId,
    updateApp
} from '../controller/AppController.js';

const router = express.Router();

router.get('/app', getAllApp);
router.post('/create/app', createApp);
router.get('/app/:id', getAppById);
router.get('/app/user/:id', getAppByUserId);
router.patch('/app/update/:id', updateApp);
router.delete('/delete/app/:id', deleteApp);

export default router;