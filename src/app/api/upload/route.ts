import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Cloudinary will be dynamically imported inside the handler to avoid build-time errors if the package is not installed.

export async function POST(request: NextRequest) {
  try {
    // Dynamic import of Cloudinary to avoid build-time module resolution failure during Turbopack build
    const cloudinaryImport = await import('cloudinary').catch((e) => {
      console.error('Cloudinary import failed:', e?.message ?? e);
      return null;
    });

    if (!cloudinaryImport || !cloudinaryImport.v2) {
      console.error('Cloudinary package not found');
      return NextResponse.json(
        { error: 'Cloudinary package missing on server' },
        { status: 500 }
      );
    }

    const { v2: cloudinary } = cloudinaryImport;

    // Vérifier la configuration Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Configuration Cloudinary manquante:', {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret
      });
      return NextResponse.json(
        { 
          error: 'Configuration Cloudinary manquante. Vérifiez vos variables d\'environnement.',
          details: 'Les variables CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET et NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME sont requises'
        }, 
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folderPath = formData.get('folderPath') as string;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    if (!folderPath) {
      return NextResponse.json({ error: 'Chemin du dossier manquant' }, { status: 400 });
    }

    // Vérifier les types de fichiers autorisés
    const allowedTypes = [
      // images
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Type de fichier non autorisé: ${file.type}` },
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximale: 10MB' },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload vers Cloudinary avec signature
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `HuuFit/${folderPath}`,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    }) as any;

    return NextResponse.json({
      success: true,
      data: {
        asset_id: result.asset_id,
        public_id: result.public_id,
        version: result.version,
        width: result.width,
        height: result.height,
        secure_url: result.secure_url,
        original_filename: result.original_filename,
        bytes: result.bytes,
        format: result.format,
        resource_type: result.resource_type,
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'upload', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    );
  }
}
