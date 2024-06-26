import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const Bucket = process.env.AMPLIFY_BUCKET;
const Region = process.env.AWS_REGION;

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: Request, res: Response) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        {
          error: '업로드할 수 없습니다.',
          isSuccess: false,
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const Body = Buffer.from(arrayBuffer);

    await s3.send(
      new PutObjectCommand({
        Bucket,
        Key: file.name,
        Body,
        ContentType: file.type,
      })
    );

    const imageUrl = `https://${Bucket}.s3.${Region}.amazonaws.com/${file.name}`;

    return NextResponse.json(
      {
        isSuccess: true,
        imageUrl,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: 'Server Error',
        isSuccess: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request, res: Response) {}
