import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/auth";
import { heroImage } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await requireAdmin(request);

  if (!admin.ok) {
    return admin.response;
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((file): file is File => file instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded." }, { status: 400 });
  }

  if (!hasCloudinaryConfig()) {
    return NextResponse.json({
      source: "demo",
      assets: files.map((file) => ({
        src: heroImage,
        alt: file.name,
        type: file.type.startsWith("video/") ? "video" : "image",
      })),
    });
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const assets = await Promise.all(files.map(uploadFile));

  return NextResponse.json({ source: "cloudinary", assets });
}

async function uploadFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const resourceType = file.type.startsWith("video/") ? "video" : "image";
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_UPLOAD_FOLDER ?? "chitwan-embroidery",
        resource_type: resourceType,
        quality_analysis: true,
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }

        resolve(uploadResult);
      },
    );

    stream.end(buffer);
  });

  return {
    src: result.secure_url,
    alt: file.name,
    type: resourceType,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

function hasCloudinaryConfig() {
  return Boolean(
    (process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}
