import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
  try {
    //request authorization from header
    const authHeader = req.headers.authorization;
    //check bearer is set or not
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token not found or invalid format.' });
    }
    //get only token frm bearer
    const token = authHeader.split(' ')[1];

    // verify token and get value paased at login time
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    //get the value paased at login time yeha pe req me apna ek useraData naame se values pass kr diya
    req.userData = { userId: decodedToken.id, email: decodedToken.email };

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    // for showing error specific
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    // Pass other errors to the next error-handling middleware
    next(error);
  }
};

export default authMiddleware;
