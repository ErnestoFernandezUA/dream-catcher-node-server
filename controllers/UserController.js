import { json } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
      _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;
    
    res.json({
      success: true,
      message: 'user registered!',
    });
  } catch (error) {
    console.log('error:', error);

    res.status(500).json({
      success: false,
      message: "can't register",
    });
  }
};

export const login = async (req, res) => {
  console.log('login');

  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User is not exist',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(404).json({
        success: false,
        message: 'User or password is incorrect',
      });
    }

    const token = jwt.sign(
      {
      _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, _id, ...userData } = user._doc;
    
    res.json({
      success: true,
      ...userData,
      token,
      userId: _id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "can't login",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User is not exist',
      }); 
    }

    const token = jwt.sign(
      {
      _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      success: true,
      ...userData,
      token,
    })
  } catch (error) {
    console.log(error);

    res.status(500),json({
      success: false,
      message: 'no access',
    });
  }
};


export const deleteMe = async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ _id: req.userId });
    
    console.log('user', user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User is not exist',
      }); 
    }

    const token = jwt.sign(
      {
      _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    res.json({
      success: true,
      message: 'User removed!'
    })
  } catch (error) {
    console.log(error);

    res.status(500),json({
      success: false,
      message: 'no access',
    });
  }
};