import { Router } from 'express';
import { getUser,test,updateUser,getAllUser,createUser} from '../controllers/userController.js';
import upload from '../middleware/config.multer.js';

const router = Router();


router.get('/profile', getUser);
router.put('/profile',upload.single('avatar'), updateUser);
router.post('/adduser', upload.single('avatar'), createUser);
router.get('/all',getAllUser)
export default router;