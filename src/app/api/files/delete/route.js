import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request) {
  try {
    const { filename } = await request.json();
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadsDir, filename);
    
    // Delete the file
    await unlink(filePath);
    
    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting file:', error);
    
    // Check if the error is because the file doesn't exist
    if (error.code === 'ENOENT') {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error deleting file' },
      { status: 500 }
    );
  }
} 