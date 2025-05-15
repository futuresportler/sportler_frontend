import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Hardcoded credentials (not recommended for production)
const TWILIO_ACCOUNT_SID = 'AC3364a48a863dc262461958833bb9d621';
const TWILIO_AUTH_TOKEN = '8574f5c0e5b46445c2c5b337eb2eb358';
const TWILIO_VERIFY_SERVICE_SID = 'VA60aba3aabb4b80b807f41c71771683db';

export async function POST(request: Request) {
  const { phoneNumber, code } = await request.json();
  
  if (!phoneNumber || !code) {
    return NextResponse.json(
      { success: false, message: 'Phone number and verification code are required' },
      { status: 400 }
    );
  }

  try {
    const client = twilio(
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN
    );
    
    const verificationCheck = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ 
        to: phoneNumber, 
        code: code 
      });
    
    return NextResponse.json({ 
      success: true,
      verificationCheck: {
        sid: verificationCheck.sid,
        service_sid: verificationCheck.serviceSid,
        account_sid: verificationCheck.accountSid,
        to: verificationCheck.to,
        channel: verificationCheck.channel,
        status: verificationCheck.status,
        valid: verificationCheck.valid,
        date_created: verificationCheck.dateCreated
      }
    });
  } catch (error: any) {
    console.error('Twilio Error:', error);
    
    // Handle specific Twilio errors
    let errorMessage = 'Invalid verification code';
    if (error.code === 20404) errorMessage = 'Verification code expired or not found';
    if (error.code === 20008) errorMessage = 'Max verification attempts reached';
    
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