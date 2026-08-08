const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const memberships = await mongodb
      .getDb()
      .collection("memberships")
      .find()
      .toArray();

    return res.status(200).json(memberships);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve memberships.",
      error: error.message
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid membership ID."
      });
    }

    const membership = await mongodb
      .getDb()
      .collection("memberships")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found."
      });
    }

    return res.status(200).json(membership);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve membership.",
      error: error.message
    });
  }
};

const createMembership = async (req, res) => {
  try {
    const membership = {
      memberId: req.body.memberId,
      plan: req.body.plan,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: req.body.status
    };

    const result = await mongodb
      .getDb()
      .collection("memberships")
      .insertOne(membership);

    return res.status(201).json({
      message: "Membership created successfully.",
      membershipId: result.insertedId
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create membership.",
      error: error.message
    });
  }
};

const updateMembership = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid membership ID."
      });
    }

    const updatedMembership = {
      memberId: req.body.memberId,
      plan: req.body.plan,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      status: req.body.status
    };

    const result = await mongodb
      .getDb()
      .collection("memberships")
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        updatedMembership
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Membership not found."
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update membership.",
      error: error.message
    });
  }
};

const deleteMembership = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid membership ID."
      });
    }

    const result = await mongodb
      .getDb()
      .collection("memberships")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Membership not found."
      });
    }

    return res.status(200).json({
      message: "Membership deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete membership.",
      error: error.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMembership,
  updateMembership,
  deleteMembership
};