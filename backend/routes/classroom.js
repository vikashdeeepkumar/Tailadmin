import { Router } from 'express';
import {createStudent,getAllClasses } from '../controllers/classroomController.js';
import { uploadMultipleImages } from '../middleware/students.multer.js';

const router = Router();

router.post('/add', uploadMultipleImages, createStudent);
router.get('/all',getAllClasses)

export default router;

