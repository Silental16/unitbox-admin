import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasSyncSecret: !!process.env.SYNC_SECRET,
    syncSecretLen: (process.env.SYNC_SECRET ?? "").length,
    hasCronSecret: !!process.env.CRON_SECRET,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasGoogleClient: !!process.env.GOOGLE_CLIENT_ID,
    hasWebhookToken: !!process.env.WEBHOOK_VERIFY_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  })
}
