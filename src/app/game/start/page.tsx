'use client'
import { useState } from 'react'
import { NicknameContent, SectorContent } from '@/components'

export default function Start() {
  const [showSectorContent, setSectorShowContent] = useState(true)
  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      {showSectorContent ? (
        <NicknameContent setSectorShowContnt={setSectorShowContent} />
      ) : (
        <SectorContent />
      )}
    </div>
  )
}
