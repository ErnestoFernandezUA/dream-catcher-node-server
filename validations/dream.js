import { body } from 'express-validator';

export const dreamCreateValidation = [
  body('title', 'Input title').isLength({ min: 3 }).isString(),

  body('text', 'Input text').isLength({ min: 3 }).isString(),

  body('tags', 'Incorrect format tags')
    .optional()
    .isArray().withMessage('Tags must be an array')
    .custom((value) => Array.isArray(value) && value.length > 0)
    .withMessage('Tags array must not be empty'),

  body('imageUrl', 'Invalid link format')
    .optional()
    .isURL().withMessage('Invalid link format'),
];
