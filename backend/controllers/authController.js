
import { findAll,create,findByEmail,findById} from '../models/models.auth.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage' // This is important for auth-code flow
);


//for test
export async function index(req, res, next) {
  try {
    const data = await findAll(); 
    if(!data){
        return res.status(404).json({message:"user not found"});
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
}

//post the user
export async function insert(req, res, next) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const errors = [];

    if (!firstname || !firstname.trim()) {
      errors.push("firstname is required.");
    }

    if (!lastname || !lastname.trim()) {
      errors.push("lastname is required.");
    }

    if (!email || !email.trim()) {
      errors.push("email is required.");
    }

    if (!password || !password.trim()) {
      errors.push("password is required.");
    }

    // logics to check validation
    if (errors.length > 0) {
      return res.status(400).json({ messages: errors });
    }

    //check email allready logics
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const inserted = await create({ first_name: firstname, last_name: lastname, email: email, password: hashedPassword });

    if (!inserted) {
      return res.status(500).json({ message: "Could not insert data." });
    } else {
      res.status(201).json({ message: "User created successfully", user: inserted });
    }

  } catch (err) {
    next(err);
  }
}


//login logic and generate jwt token 
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

  //email not 
    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email not registerd." });
    }

  //password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

   //generating token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    next(err);
  }
}

//gogle insert data

export async function googleInsert(req, res, next) {
  const { code } = req.body;

  try {
    if (!code) {
      return res.status(400).json({ message: 'Authorization code is required.' });
    }

    const { tokens } = await client.getToken({
      code,
      redirect_uri: 'postmessage'
    });

    if (!tokens.id_token) {
      return res.status(400).json({ message: 'Missing ID token.' });
    }

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Invalid token payload.' });
    }

    const { given_name, family_name, email, picture } = payload;
    const firstname = given_name || 'Guest';
    const lastname = family_name || '';
    const profilePictureUrl = picture || 'owner.jpg';

    // Check if user already exists
    let userData = await findByEmail(email);

    if (!userData) {
      console.log("User does not exist. Creating new user.");
      const hashedPassword = await bcrypt.hash("12345678", 10);
      const newUserId = await create({
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: hashedPassword,
        avatar: profilePictureUrl,
      });

      // Fetch the newly created user's data using the returned ID
      userData = await findById(newUserId);
      
      console.log("User created:", userData);
    } else {
      console.log("User already exists. Issuing new JWT.");
    }

    // Handle case where user data could not be retrieved
    if (!userData) {
      return res.status(404).json({ message: 'User not found after creation/lookup.' });
    }

    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    next(err);
  }
}








