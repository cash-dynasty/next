import {NextResponse} from 'next/server';

export async function GET(request: Request) {
 return NextResponse.json([
     {
         id: 1
     },
     {
         id: 2
     }
 ])
}

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