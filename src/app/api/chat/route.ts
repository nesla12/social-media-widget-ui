import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://n8n.srv919758.hstgr.cloud/webhook/chat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();

    if (!response.ok) {
      console.error('Webhook Error:', response.status, data);
      return NextResponse.json(
        { error: `n8n Webhook Fehler (${response.status}): Webhook nicht aktiv oder URL falsch` },
        { status: 502 }
      );
    }

    return new NextResponse(data, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Verbindungsfehler: n8n Server nicht erreichbar' },
      { status: 500 }
    );
  }
}
