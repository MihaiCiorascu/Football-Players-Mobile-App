import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Get list of files
    const files = await readdir(uploadsDir);
    
    // Get details for each file
    const fileDetails = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadsDir, filename);
        const stats = await stat(filePath);
        
        return {
          filename,
          originalName: filename.split('-').slice(0, -1).join('-'), // Remove the unique suffix
          size: stats.size,
          createdAt: stats.birthtime,
          url: `/uploads/${filename}`
        };
      })
    );
    
    // Sort files by creation date (newest first)
    fileDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return NextResponse.json({
      success: true,
      files: fileDetails
    });
    
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      { error: 'Error listing files' },
      { status: 500 }
    );
  }
} 