import { readFileSync } from "fs";

const crops = JSON.parse(
  readFileSync(new URL("../db/crops.json", import.meta.url), "utf-8")
);

export const getCropInfoList = (req, res) => {
  res.json(crops.map(({ id, name }) => ({ id, name })));
};

export const getCropInfo = (req, res) => {
  const key = req.params.id.toLowerCase();
  const crop = crops.find((c) => c.id === key || c.name.toLowerCase() === key);
  if (!crop) return res.status(404).json({ message: "Crop info not found" });
  res.json(crop);
};
