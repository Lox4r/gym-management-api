const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const classes = await mongodb
      .getDb()
      .collection("classes")
      .find()
      .toArray();

    return res.status(200).json(classes);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve classes.",
      error: error.message
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid class ID."
      });
    }

    const gymClass = await mongodb
      .getDb()
      .collection("classes")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!gymClass) {
      return res.status(404).json({
        message: "Class not found."
      });
    }

    return res.status(200).json(gymClass);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve class.",
      error: error.message
    });
  }
};

const createClass = async (req, res) => {
  try {
    const gymClass = {
      className: req.body.className,
      trainerId: req.body.trainerId,
      schedule: req.body.schedule,
      duration: req.body.duration,
      capacity: req.body.capacity
    };

    const result = await mongodb
      .getDb()
      .collection("classes")
      .insertOne(gymClass);

    return res.status(201).json({
      message: "Class created successfully.",
      classId: result.insertedId
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create class.",
      error: error.message
    });
  }
};

const updateClass = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid class ID."
      });
    }

    const updatedClass = {
      className: req.body.className,
      trainerId: req.body.trainerId,
      schedule: req.body.schedule,
      duration: req.body.duration,
      capacity: req.body.capacity
    };

    const result = await mongodb
      .getDb()
      .collection("classes")
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        updatedClass
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Class not found."
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update class.",
      error: error.message
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid class ID."
      });
    }

    const result = await mongodb
      .getDb()
      .collection("classes")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Class not found."
      });
    }

    return res.status(200).json({
      message: "Class deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete class.",
      error: error.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createClass,
  updateClass,
  deleteClass
};