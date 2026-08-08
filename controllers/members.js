const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const members = await mongodb
      .getDb()
      .collection("members")
      .find()
      .toArray();

    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve members.",
      error: error.message
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid member ID."
      });
    }

    const member = await mongodb
      .getDb()
      .collection("members")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!member) {
      return res.status(404).json({
        message: "Member not found."
      });
    }

    return res.status(200).json(member);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve member.",
      error: error.message
    });
  }
};

const createMember = async (req, res) => {
  try {
    const member = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      membershipType: req.body.membershipType,
      joinDate: req.body.joinDate,
      active: req.body.active
    };

    const result = await mongodb
      .getDb()
      .collection("members")
      .insertOne(member);

    return res.status(201).json({
      message: "Member created successfully.",
      memberId: result.insertedId
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create member.",
      error: error.message
    });
  }
};

const updateMember = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid member ID."
      });
    }

    const updatedMember = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      membershipType: req.body.membershipType,
      joinDate: req.body.joinDate,
      active: req.body.active
    };

    const result = await mongodb
      .getDb()
      .collection("members")
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        updatedMember
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Member not found."
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update member.",
      error: error.message
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid member ID."
      });
    }

    const result = await mongodb
      .getDb()
      .collection("members")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Member not found."
      });
    }

    return res.status(200).json({
      message: "Member deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete member.",
      error: error.message
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMember,
  updateMember,
  deleteMember
};