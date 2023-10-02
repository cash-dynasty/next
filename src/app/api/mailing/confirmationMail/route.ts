import RegistrationConfirmEmail from '@/emails/confirm-registration'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_KEY)

export async function POST(request: Request) {
  const { mailTo, confirmationToken, validFor, username } = await request.json()
  const headers = request.headers

  // console.log(headers)

  NextResponse.next({ headers })

  try {
    const data = await resend.emails.send({
      from: 'CashDynasty.pl <no-replay@cashdynasty.pl>',
      to: [mailTo],
      subject: 'Potwierdzenie rejestracji w CashDynasty.pl',
      react: RegistrationConfirmEmail({ username, confirmationToken, validFor, email: mailTo }),
    })

    if (data.id) {
      return NextResponse.json(
        {
          status: 'success',
          message: 'mail_sent',
        },
        { status: 200 },
      )
    }
  } catch (e) {
    return NextResponse.json(
      {
        status: 'fail',
        message: 'mail_not_sent',
      },
      { status: 409 },
    )
  }
}
