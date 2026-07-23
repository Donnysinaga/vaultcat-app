import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const IMAGE_MAP: Record<string, string> = {
  logo: "vaultcat_logo_1784772993384.jpg",
  hero: "vaultcat_hero_1784772981004.jpg",
  sleeping: "vaultcat_sleeping_1784773006248.jpg",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const fileName = IMAGE_MAP[name];

  if (!fileName) {
    return new NextResponse("Image not found", { status: 404 });
  }

  // The path to the user's brain directory
  const brainDir = "C:\\Users\\Donny\\.gemini\\antigravity\\brain\\5251cd8f-cd54-43b0-80a7-101e1749ac1e";
  const filePath = path.join(brainDir, fileName);

  // Auto-copy logo.png, favicon.png, hero.jpg, and sleeping.jpg to public directories if they don't exist
  try {
    const publicLogoDir = path.join(process.cwd(), "public", "logo");
    const publicImagesDir = path.join(process.cwd(), "public", "images");
    
    if (!fs.existsSync(publicLogoDir)) {
      fs.mkdirSync(publicLogoDir, { recursive: true });
    }
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }

    const publicLogoPath = path.join(publicLogoDir, "logo.png");
    const publicFaviconPath = path.join(publicLogoDir, "favicon.png");
    const publicHeroPath = path.join(publicImagesDir, "hero.jpg");
    const publicSleepingPath = path.join(publicImagesDir, "sleeping.jpg");

    const logoSourcePath = path.join(brainDir, IMAGE_MAP["logo"]);
    const heroSourcePath = path.join(brainDir, IMAGE_MAP["hero"]);
    const sleepingSourcePath = path.join(brainDir, IMAGE_MAP["sleeping"]);

    if (fs.existsSync(logoSourcePath)) {
      if (!fs.existsSync(publicLogoPath)) {
        fs.copyFileSync(logoSourcePath, publicLogoPath);
      }
      if (!fs.existsSync(publicFaviconPath)) {
        fs.copyFileSync(logoSourcePath, publicFaviconPath);
      }
    }
    if (fs.existsSync(heroSourcePath) && !fs.existsSync(publicHeroPath)) {
      fs.copyFileSync(heroSourcePath, publicHeroPath);
    }
    if (fs.existsSync(sleepingSourcePath) && !fs.existsSync(publicSleepingPath)) {
      fs.copyFileSync(sleepingSourcePath, publicSleepingPath);
    }
  } catch (err) {
    console.error("Auto-copy assets failed:", err);
  }

  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File does not exist on disk", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error reading image file:", error);
    return new NextResponse("Error reading image file", { status: 500 });
  }
}
