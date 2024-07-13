"use client"

import Image from "next/image"
import { useAtom } from "jotai"

import { previewTrackAtom } from "@/lib/atom"

export function PreviewTrack() {
  const [track] = useAtom(previewTrackAtom)
  if (!track) return null

  return (
    <div className="rounded-xl bg-white/5 p-4">
      <div className="relative aspect-square size-full min-w-fit">
        <Image
          src={track.album.images[0].url}
          alt={track.name}
          fill
          sizes="200px"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-2xl font-bold">{track.name}</h3>
          {track.preview_url && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 fill-green-500"
            >
              <path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75ZM16.45 5.05a.75.75 0 0 0-1.06 1.061 5.5 5.5 0 0 1 0 7.778.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.899Z" />
              <path d="M14.329 7.172a.75.75 0 0 0-1.061 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 0 0 1.06 1.06 4 4 0 0 0 0-5.656Z" />
            </svg>
          )}
        </div>
        <p className="text-gray-500">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  )
}
