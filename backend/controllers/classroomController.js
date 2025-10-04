
import {insertClass,insertFiles,findAll} from '../models/models.classroom.js';
import path from 'path';
import fs from "fs";


export async function createStudent(req, res, next) {
  const newClass = req.body;
  const errors = [];
  
    //getting array on uoloaded images
  const uploadedFiles = req.files || [];

  try {
    
    if (!newClass.class_name || !newClass.class_name.trim()) {
      errors.push("Class name is required.");
    }
    
    const numStudents = Number(newClass.noofstudents);
    if (isNaN(numStudents) || numStudents <= 0) {
      errors.push("Number of students must be a positive number.");
    }
    
    if (errors.length > 0) {
      uploadedFiles.forEach(file => fs.unlinkSync(file.path));
      return res.status(400).json({ messages: errors });
    }

   
    const imagePaths = uploadedFiles.map(file => `${path.basename(file.path)}`);
    
   
    const imagePathsAsString = imagePaths.join(',');

    //here do db query
 const createdClassId = await insertClass(newClass);
  await insertFiles(createdClassId, imagePaths);
    if (!createdClassId) {
      uploadedFiles.forEach(file => fs.unlinkSync(file.path));
      return res.status(400).json({ message: "Failed to create class " });
    }

    res.status(201).json({
      message: "classroom created successfully",
      classId: createdClassId,
    });

  } catch (err) {

    uploadedFiles.forEach(file => fs.unlinkSync(file.path));
    next(err);
  }
}


export async function getAllClasses(req, res, next) {
  try {
    const { page = 1, limit = 10, search = '',userEmail = '' } = req.query;
    
    // Call the updated findAll function with pagination and search parameters
    const { data, totalClasses, totalPages } = await findAll({ page, limit, search,userEmail }); 
    res.status(200).json({
      message: "All users data fetched successfully",
      meta: {
        currentPage: parseInt(page),
        perPage: parseInt(limit),
        totalClasses,
        totalPages
      },
      classes: data
    });
  } catch (err) {
    next(err);
  }
}
