import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    console.log('Received intent submission:', {
      user: data.user,
      fromToken: data.fromToken,
      toToken: data.toToken,
      amount: data.amount,
      receive: data.receive,
      expiryTime: data.expiryTime
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing intent submission:', error);
    return NextResponse.json(
      { error: 'Failed to process intent submission' },
      { status: 500 }
    );
  }
}
