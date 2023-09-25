import RegistrationConfirmEmail from '@/emails/confirm-registration'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_KEY)

export async function POST(request: Request) {
  const { mailTo, confirmationToken, validFor, username } = await request.json()
  try {
    const data = await resend.emails.send({
      from: 'CashDynasty.pl <no-replay@cashdynasty.pl>',
      to: [mailTo],
      subject: 'Potwierdzenie rejestracji w CashDynasty.pl',
      react: RegistrationConfirmEmail({ username, confirmationToken, validFor, email: mailTo }),
    })

    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
  }
}
