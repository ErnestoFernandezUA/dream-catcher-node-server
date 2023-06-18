import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');

      console.log('id decoded:', decoded._id);

      req.userId = decoded._id;

      next();
    } catch (error) {
      return res.status(405).json({
        message: 'No decoded token',
      })    
    }
  } else {
    return res.status(403).json({
      message: 'No access',
    })
  }
};
