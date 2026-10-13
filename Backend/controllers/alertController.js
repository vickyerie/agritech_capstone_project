import Alert from "../db/models/Alert.js";
import Crop from "../db/models/Crop.js";
import Farm from "../db/models/Farm.js";

// Helper: cek crop itu ada di farm milik user yang login
const assertOwnsCrop = async (cropId, userId) => {
  const crop = await Crop.findById(cropId).populate("farm");
  if (!crop) return null;
  if (String(crop.farm.user) !== userId) return null;
  return crop;
};

// Admin: buat alert untuk sebuah crop
export const createAlert = async (req, res) => {
  try {
    const { crop, type, name, description, severity, recommendedAction } = req.body;

    const cropExists = await Crop.findById(crop);
    if (!cropExists) return res.status(404).json({ message: "Crop not found" });

    const alert = await Alert.create({ crop, type, name, description, severity, recommendedAction });
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Farmer: lihat semua alert untuk salah satu crop miliknya
export const getAlertsByCrop = async (req, res) => {
  try {
    const crop = await assertOwnsCrop(req.params.cropId, req.user.id);
    if (!crop) return res.status(403).json({ message: "Not authorized" });

    const alerts = await Alert.find({ crop: req.params.cropId }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Farmer: lihat semua alert aktif dari SELURUH crop miliknya (ringkasan dashboard)
export const getMyAlerts = async (req, res) => {
  try {
    const myFarms = await Farm.find({ user: req.user.id }).select("_id");
    const farmIds = myFarms.map((f) => f._id);

    const myCrops = await Crop.find({ farm: { $in: farmIds } }).select("_id");
    const cropIds = myCrops.map((c) => c._id);

    const alerts = await Alert.find({ crop: { $in: cropIds }, status: "active" })
      .populate("crop", "name variety")
      .sort({ severity: -1, createdAt: -1 });

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Farmer: tandai alert sudah ditangani
export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ message: "Alert not found" });

    const crop = await assertOwnsCrop(alert.crop, req.user.id);
    if (!crop) return res.status(403).json({ message: "Not authorized" });

    alert.status = "resolved";
    await alert.save();
    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: hapus alert
export const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    if (!alert) return res.status(404).json({ message: "Alert not found" });
    res.json({ message: "Alert deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
