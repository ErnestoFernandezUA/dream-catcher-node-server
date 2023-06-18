import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid email format.').isEmail(),
  body('password', 'The password should be longer than 5 characters.').isLength({ min: 5 }),
  body('fullName', 'The full name should be longer than 3 characters.').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid link format').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Invalid email format.').isEmail(),
  body('password', 'The password should be longer than 5 characters.').isLength({ min: 5 }),
];