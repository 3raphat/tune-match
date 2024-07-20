"use client"

import { Button } from "@headlessui/react"
import { useAtom } from "jotai"

import { selectedTrackAtom } from "@/lib/atom"
import { RecommendationsButton } from "@/components/recommendations-button"

export function SelectedTracks() {
  const [selectedTracks, setSelectedTracks] = useAtom(selectedTrackAtom)
  if (selectedTracks.length === 0) return null

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">
          Selected Track{selectedTracks.length === 1 ? "" : "s"} (
          {selectedTracks.length})
        </h3>
        <Button
          className="inline-flex items-center gap-1 rounded bg-white/5 px-1.5 text-sm text-gray-400"
          onClick={() => setSelectedTracks([])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
          </svg>
          Clear
        </Button>
      </div>
      <ul className="mb-4 flex flex-col gap-2">
        {selectedTracks.map((track) => (
          <li key={track.id} className="inline-flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 transition hover:cursor-pointer hover:fill-red-400"
              onClick={() =>
                setSelectedTracks(
                  selectedTracks.filter((t) => t.id !== track.id)
                )
              }
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                clipRule="evenodd"
              />
            </svg>
            {track.artists.map((artist) => artist.name).join(", ")} -{" "}
            {track.name}
          </li>
        ))}
      </ul>
      <RecommendationsButton />
    </div>
  )
}
