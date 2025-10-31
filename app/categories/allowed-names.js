export const allowedNames = [
  "Abrasives",
  "Bearings",
  "Cutting Tools",
  "Electrical Supplies",
  "Fasteners",
  "Hardware & Material",
  "Mechanical Power Transmission",
  "Facility Supplies",
  "Hydraulics",
  "Lab Supplies",
  "Linear Motion Systems",
  "Lubrication Systems & Lubricants",
  "Material Handling",
  "Motors & Drives",
  "MRO Chemicals",
  "Pneumatics",
  "Process Equipment",
  "Safety & Environment",
  "Tools",
  "Seals",
];

export const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default allowedNames;
