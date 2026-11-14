import { NextResponse } from 'next/server';
import { VERIFIED_COLLEGES } from '@/data/colleges';

const INDEXNOW_KEY = 'bengalcampus67823f99a1244d82b45';
const HOST = 'bengalcampus.in';
const KEY_LOCATION = `https://${HOST}/bengalcampus67823f99a1244d82b45.txt`;

export async function POST(request: Request) {
  try {
    const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const baseUrl = rawUrl && !rawUrl.includes('localhost') ? rawUrl : `https://${HOST}`;

    // Collect all major search index targets
    const urlList = [
      `${baseUrl}`,
      `${baseUrl}/colleges`,
      `${baseUrl}/compare`,
      `${baseUrl}/cutoffs`,
      `${baseUrl}/counselling-simulator`,
      ...VERIFIED_COLLEGES.map((c) => `${baseUrl}/colleges/${c.slug}`),
    ];

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    };

    // Dispatch to Bing / IndexNow endpoint
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const success = status === 200 || status === 202;

    return NextResponse.json({
      success,
      status,
      submittedUrls: urlList.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown IndexNow error',
      },
      { status: 500 }
    );
  }
}
