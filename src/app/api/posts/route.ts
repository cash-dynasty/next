import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await prisma.post.findMany()

  return NextResponse.json(posts)
}
