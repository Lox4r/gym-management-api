const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const trainers = await mongodb
      .getDb()
      .collection("trainers")
      .find()
      .toArray();

    return res.status(200).json(trainers);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve trainers.",
      error: error.message
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid trainer ID."
      });
    }

    const trainerId = new ObjectId(req.params.id);

    const trainer = await mongodb
      .getDb()
      .collection("trainers")
      .findOne({ _id: trainerId });

    if (!trainer) {
      return res.status(404).json({
        message: "Trainer not found."
      });
    }

    return res.status(200).json(trainer);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve trainer.",
      error: error.message
    });
  }
};

const createTrainer = async (req, res) => {
  try {
    const trainer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      specialty: req.body.specialty,
      email: req.body.email,
      phone: req.body.phone,
      yearsExperience: req.body.yearsExperience,
      active: req.body.active
    };

    const result = await mongodb
      .getDb()
      .collection("trainers")
      .insertOne(trainer);

    if (!result.acknowledged) {
      return res.status(500).json({
        message: "Failed to create trainer."
      });
    }

    return res.status(201).json({
      message: "Trainer created successfully.",
      trainerId: result.insertedId
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create trainer.",
      error: error.message
    });
  }
};

const updateTrainer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid trainer ID."
      });
    }

    const trainerId = new ObjectId(req.params.id);

    const updatedTrainer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      specialty: req.body.specialty,
      email: req.body.email,
      phone: req.body.phone,
      yearsExperience: req.body.yearsExperience,
      active: req.body.active
    };

    const result = await mongodb
      .getDb()
      .collection("trainers")
      .replaceOne({ _id: trainerId }, updatedTrainer);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Trainer not found."
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update trainer.",
      error: error.message
    });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid trainer ID."
      });
    }

    const trainerId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection("trainers")
      .deleteOne({ _id: trainerId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Trainer not found."
      });
    }

    return res.status(200).json({
      message: "Trainer deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete trainer.",
      error: error.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTrainer,
  updateTrainer,
  deleteTrainer
};