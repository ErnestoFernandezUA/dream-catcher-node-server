import { validationResult } from 'express-validator';

import DreamModel from '../models/Dream.js';

export const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const doc = new DreamModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const dream = await doc.save();

    res.json(dream);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Can't create dream",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const dreams = await DreamModel.find().populate('user').exec();

    res.json({
      success: true,
      dreams,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Can't get all dreams",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const dreamId = req.params.id

    const updatedDream = await DreamModel.findOneAndUpdate(
      { _id: dreamId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    ).exec();

    if (!updatedDream) {
      return res.status(404).json({
        success: false,
        message: "Dream is not found",
      });
    }  

    return res.json(updatedDream);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Can't get a dream",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const dreamId = req.params.id

    const deletedDream = await DreamModel.findOneAndDelete(
      { _id: dreamId },
    ).exec();

    if (!deletedDream) {
      return res.status(404).json({
        success: false,
        message: "Dream is not found",
      });
    }  

    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Can't remove a dream",
    });
  }
};

export const update = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const dreamId = req.params.id

    const updatedDream = await DreamModel.updateOne(
      { _id: dreamId },
      { 
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
      { returnDocument: 'after' }
    ).exec();

    if (!updatedDream) {
      return res.status(404).json({
        success: false,
        message: "Dream is not found",
      });
    }  

    return res.json(updatedDream);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Can't update a dream",
    });
  }
};