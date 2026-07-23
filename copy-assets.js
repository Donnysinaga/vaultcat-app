const fs = require('fs');
const path = require('path');

const brainDir = "C:\\Users\\Donny\\.gemini\\antigravity\\brain\\5251cd8f-cd54-43b0-80a7-101e1749ac1e";
const publicLogoDir = path.join(__dirname, "public", "logo");
const publicImagesDir = path.join(__dirname, "public", "images");

// Ensure directories exist
if (!fs.existsSync(publicLogoDir)) {
  fs.mkdirSync(publicLogoDir, { recursive: true });
}
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const logoSource = path.join(brainDir, "vaultcat_logo_1784772993384.jpg");
const heroSource = path.join(brainDir, "vaultcat_hero_1784772981004.jpg");
const sleepingSource = path.join(brainDir, "vaultcat_sleeping_1784773006248.jpg");

console.log("Starting asset copy operation...");

if (fs.existsSync(logoSource)) {
  fs.copyFileSync(logoSource, path.join(publicLogoDir, "logo.png"));
  fs.copyFileSync(logoSource, path.join(publicLogoDir, "favicon.png"));
  console.log("✅ Logo and Favicon copied successfully to public/logo/");
} else {
  console.error("❌ Logo source not found at: " + logoSource);
}

if (fs.existsSync(heroSource)) {
  fs.copyFileSync(heroSource, path.join(publicImagesDir, "hero.jpg"));
  console.log("✅ Hero mascot copied successfully to public/images/");
} else {
  console.error("❌ Hero source not found at: " + heroSource);
}

if (fs.existsSync(sleepingSource)) {
  fs.copyFileSync(sleepingSource, path.join(publicImagesDir, "sleeping.jpg"));
  console.log("✅ Sleeping mascot copied successfully to public/images/");
} else {
  console.error("❌ Sleeping source not found at: " + sleepingSource);
}

console.log("Asset copy operation completed.");
