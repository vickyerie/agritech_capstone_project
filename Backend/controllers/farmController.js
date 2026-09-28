import Farm from "../db/models/Farm.js";

// Create farm
export const createFarm = async (req, res) => {
  try {
    const { name, location, areaSize, cropType, establishedDate } = req.body;
    const farm = await Farm.create({
      user: req.user.id,
      name,
      location,
      areaSize,
      cropType,
      establishedDate,
    });
    res.status(201).json(farm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all farms belonging to the logged-in user
export const getMyFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(farms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single farm by id (must belong to the logged-in user)
export const getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findOne({ _id: req.params.id, user: req.user.id });
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    res.json(farm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update farm
export const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    res.json(farm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete farm
export const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!farm) return res.status(404).json({ message: "Farm not found" });
    res.json({ message: "Farm deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
