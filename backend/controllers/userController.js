import { findById,updateById,findByEmail,findAll,insertUser} from '../models/models.auth.js';
import path from 'path';
import bcrypt from "bcryptjs";
import fs from "fs";


export async function getAllUser(req, res, next) {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    // Call the updated findAll function with pagination and search parameters
    const { data, totalUsers, totalPages } = await findAll({ page, limit, search }); 
    
    // A 404 should be reserved for when the resource itself isn't found, not just an empty result set.
    // If the query succeeds but returns no users, it's still a 200 OK.
    
    res.status(200).json({
      message: "All users data fetched successfully",
      meta: {
        currentPage: parseInt(page),
        perPage: parseInt(limit),
        totalUsers,
        totalPages
      },
      user: data
    });
  } catch (err) {
    next(err);
  }
}


export async function getUser(req, res, next) {
    const { userId, email } = req.userData;
  try {
    const data = await findById(userId); 
    if(!data){
        return res.status(404).json({message:"user not found"});
    }
    
    res.status(200).json({
    message: "Profile data fetched successfully",
    user: data
  });
  } catch (err) {
    next(err);
  }
}


//add user

export async function createUser(req, res, next) {
  const newUser = req.body;
  const errors = [];
  try {
    if (!newUser.first_name || !newUser.first_name.trim()) {
      errors.push("firstname is required.");
    }

    if (!newUser.last_name || !newUser.last_name.trim()) {
      errors.push("lastname is required.");
    }

    if (!newUser.email || !newUser.email.trim()) {
      errors.push("email is required.");
    }

    if (!newUser.password || !newUser.password.trim()) {
      errors.push("password is required.");
    }

      if (errors.length > 0) {
      return res.status(400).json({ messages: errors });
    }
    
    const existingUser = await findByEmail(newUser.email);
    if (existingUser) {
      
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(409).json({ message: "Email already exists" });
    }

    
    if (req.file) {
      
      newUser.avatar = `${req.file.filename}`;
    } else {
      
      newUser.avatar = 'owner.jpg'; 
    }

   const hashedPassword = await bcrypt.hash(newUser.password, 10);
     newUser.password = hashedPassword;
    const createdUserId = await insertUser(newUser);

    if (!createdUserId) {
      
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "Failed to create user" });
    }

    
    res.status(201).json({
      message: "User created successfully",
      userId: createdUserId
    });

  } catch (err) {
    
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(err);
  }
}






//update user
export async function updateUser(req, res, next) {
  const { userId } = req.userData;
  const updateData = req.body;
  const uploadFolder = '../frontend/public/images/user';
  try {
    const user = await findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    
    if (updateData.email !== undefined && updateData.email !== user.email) {
      const existingUser = await findByEmail(updateData.email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

     // Handle file upload
    if (req.file) {
      // Delete old avatar if it exists
      if (user.avatar) {
        
        const oldAvatarPath = path.join(uploadFolder, path.basename(user.avatar));
        if(oldAvatarPath !="../frontend/public/images/user/owner.jpg"){
            console.log("image",oldAvatarPath);
          if (fs.existsSync(oldAvatarPath)) {
            fs.unlinkSync(oldAvatarPath);
        }
        }
        
      }
      
      // Store relative path to the avatar
      updateData.avatar = `${req.file.filename}`;
    }

    const isUpdated = await updateById(userId, updateData);
    
    if (!isUpdated) {
      return res.status(400).json({ message: "Failed to update user" });
    }
    
    const updatedUser = await findById(userId);
    
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
    
  } catch (err) {
    next(err);
  }
}
//old one for just getting the value from token and shown
export async function test(req, res){
  const { userId, email } = req.userData;
  res.status(200).json({
    message: "Profile data fetched successfully",
    user: { id: userId, email: email }
  });
}

