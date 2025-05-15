import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Hardcoded credentials (not recommended for production)
const TWILIO_ACCOUNT_SID = 'AC3364a48a863dc262461958833bb9d621';
const TWILIO_AUTH_TOKEN = '8574f5c0e5b46445c2c5b337eb2eb358';
const TWILIO_VERIFY_SERVICE_SID = 'VA60aba3aabb4b80b807f41c71771683db';

export async function POST(request: Request) {
  const { phoneNumber, channel = 'sms' } = await request.json();
  
  if (!phoneNumber) {
    return NextResponse.json(
      { success: false, message: 'Phone number is required' },
      { status: 400 }
    );
  }

  try {
    const client = twilio(
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN
    );
    
    const verification = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ 
        to: phoneNumber, 
        channel: channel 
      });
    
    return NextResponse.json({ 
      success: true,
      verification: {
        sid: verification.sid,
        service_sid: verification.serviceSid,
        account_sid: verification.accountSid,
        to: verification.to,
        channel: verification.channel,
        status: verification.status,
        date_created: verification.dateCreated
      }
    });
  } catch (error: any) {
    console.error('Twilio Error:', error);
    
    // Handle specific Twilio errors
    let errorMessage = 'Failed to send verification code';
    if (error.code === 20003) errorMessage = 'Invalid phone number';
    if (error.code === 20004) errorMessage = 'Invalid phone number format';
    if (error.code === 20009) errorMessage = 'Geographic permissions denied';
    if (error.code === 20429) errorMessage = 'Too many requests';
    
    return NextResponse.json({ 
      success: false, 
      message: errorMessage,
      error: {
        code: error.code,
        message: error.message
      }
    }, { status: 400 });
  }
}