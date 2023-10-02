import axios from 'axios'
import { NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleRTKErrors = (error: any) => {
  if (!!error && 'status' in error) {
    return error.data
  }
}

const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY

export const validateRecaptcha = async (gReCaptchaToken: string) =>
  await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${gReCaptchaToken}`,
    )
    .then((res) => {
      if (!res.data.success || res.data.score < 0.5) {
        return NextResponse.json(
          {
            status: 'fail',
            message: 'Captcha verification failed',
          },
          { status: 409 },
        )
      }
    })
    .catch((err) => {
      return NextResponse.json({ status: 'fail', message: err }, { status: 400 })
    })
