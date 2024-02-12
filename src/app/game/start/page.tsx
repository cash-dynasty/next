'use client'
import { useState } from 'react'
import { NicknameContent, SectorSelectContent } from '@/components'

export default function Start() {
  const [showSectorContent, setSectorShowContent] = useState(true)

  return (
    <div className="h-screen bg-gradient-radial from-[#0f0f0f] from-0% via-[#282828] via-0% to-[#050505] to-100% gap-5">
      {showSectorContent ? (
        <NicknameContent setSectorShowContent={setSectorShowContent} />
      ) : (
        <SectorSelectContent />
      )}
    </div>
  )
}
