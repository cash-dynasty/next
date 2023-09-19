import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_KEY)

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: 'admin <no-replay@cashdynasty.pl>',
      to: ['dev@cashdynasty.pl'],
      subject: 'test email title',
      html: '<h1>This is test email suko</h1>',
    })

    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
