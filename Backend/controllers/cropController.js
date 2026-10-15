import Crop from "../db/models/Crop.js";
import Farm from "../db/models/Farm.js";

// Helper: make sure the farm belongs to the logged-in user
const assertOwnsFarm = async (farmId, userId) => {
  const farm = await Farm.findOne({ _id: farmId, user: userId });
  return farm;
};

// Create crop under a farm
export const createCrop = async (req, res) => {
  try {
    const { farm, name, variety, quantity, plantedDate, harvestDate } = req.body;

    const ownedFarm = await assertOwnsFarm(farm, req.user.id);
    if (!ownedFarm) return res.status(403).json({ message: "You do not own this farm" });

    const crop = await Crop.create({ farm, name, variety, quantity, plantedDate, harvestDate });
    res.status(201).json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: get all crops across all users (buat pilih crop pas bikin Alert)
export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate({ path: "farm", select: "name location user", populate: { path: "user", select: "name" } })
      .sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all crops for a specific farm
export const getCropsByFarm = async (req, res) => {
  try {
    const ownedFarm = await assertOwnsFarm(req.params.farmId, req.user.id);
    if (!ownedFarm) return res.status(403).json({ message: "You do not own this farm" });

    const crops = await Crop.find({ farm: req.params.farmId }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single crop
export const getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate("farm");
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    if (String(crop.farm.user) !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update crop
export const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate("farm");
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    if (String(crop.farm.user) !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(crop, req.body);
    await crop.save();
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete crop
export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate("farm");
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    if (String(crop.farm.user) !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await crop.deleteOne();
    res.json({ message: "Crop deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
