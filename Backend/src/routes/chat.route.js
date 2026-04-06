import express from 'express';              // chat.js or chat.route.js both works as same javascript file only just name is different 
import { getStreamToken } from '../controllers/chat.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get("/token", protectRoute, getStreamToken);  // protectRoute is a middleware created in auth.middleware.js


export default router;