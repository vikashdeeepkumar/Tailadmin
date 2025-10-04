import { Router } from 'express';
import { index,insert,login,googleInsert} from '../controllers/authController.js';
import upload from '../middleware/config.multer.js';


const router = Router();


router.post('/singup',insert);
router.post('/login',login);

//google signup
router.post('/google-signup',googleInsert)

export default router;