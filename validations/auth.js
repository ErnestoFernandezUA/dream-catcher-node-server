import { body } from 'express-validator';

export const registerValidation = [
  body('fullName', 'The name should be longer than 3 characters.').isLength({ min: 3 }),
  body('email', 'Invalid email format.').isEmail(),
  body('password', 'The password should be longer than 5 characters.').isLength({ min: 5 }),
  body('avatarUrl', 'Invalid link format').optional().isURL(),
];

export const loginValidation = [
  // body('fullName', 'The name should be longer than 3 characters.').isLength({ min: 3 }),
  body('email', 'Invalid email format.').isEmail(),
  body('password', 'The password should be longer than 5 characters.').isLength({ min: 5 }),
];