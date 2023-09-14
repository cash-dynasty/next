import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(request: Request) {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}
/*
export async function POST(request: Request) {
    return NextResponse.json([
        {
            id: 2
        },
        {
            id: 3
        }
    ])
}
*/
