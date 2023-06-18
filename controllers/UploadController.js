import UserModel from '../models/User.js';

export const upload = async (req, res) => {
  if (!req.userId) {
    return res.status(403).json({
      message: 'Not authorized',
    });
  }

  const user = await UserModel.findOne({ _id: req.userId });

  if (!user) {
    return res.status(404).json({
      message: 'This user not found',
    });
  }

  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
}