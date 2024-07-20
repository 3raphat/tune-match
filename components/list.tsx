"use client"

import { useAtom } from "jotai"
import { Session } from "next-auth"

import { recommendationsAtom, searchResultAtom } from "@/lib/atom"
import { CreatePlaylistButton } from "@/components/create-playlist-button"
import { Track } from "@/components/track"

export function RecommendationsList({ session }: { session: Session }) {
  const [results] = useAtom(recommendationsAtom)
  if (!results) return null

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">Your Recommendations</h3>
        <CreatePlaylistButton session={session} />
      </div>
      <ul className="flex flex-col gap-2">
        {results.map((track) => (
          <li key={track.id}>
            <Track key={track.name} track={track} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SearchList() {
  const [results] = useAtom(searchResultAtom)
  if (!results) return null

  return (
    <ul className="col-start-2 flex flex-col gap-2">
      {results.items.map((track) => (
        <li key={track.id}>
          <Track key={track.name} track={track} />
        </li>
      ))}
    </ul>
  )
}
