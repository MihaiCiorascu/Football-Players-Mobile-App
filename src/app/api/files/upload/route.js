import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

// Maximum file size (100MB)
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request) {
  try {
    // Check if the request has a file
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the maximum limit of 100MB' },
        { status: 400 }
      );
    }
    
    // Get file details
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${file.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}${path.extname(file.name)}`;
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      // Directory might already exist, which is fine
    }
    
    // Save the file
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);
    
    // Return success response with file details
    return NextResponse.json({
      success: true,
      filename,
      originalName: file.name,
      size: file.size,
      type: file.type,
      url: `/uploads/${filename}`
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

// Increase the body size limit for this API route
export const config = {
  api: {
    bodyParser: false,
  },
}; 