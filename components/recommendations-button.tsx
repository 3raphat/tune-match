"use client"

import { useState } from "react"
import { Button } from "@headlessui/react"
import { useAtom } from "jotai"

import { recommendationsAtom, selectedTrackAtom } from "@/lib/atom"
import { Spotify } from "@/lib/spotify"

export function RecommendationsButton() {
  const [selectedTracks] = useAtom(selectedTrackAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [_, setRecommendations] = useAtom(recommendationsAtom)

  const disabled = selectedTracks.length === 0 || isLoading

  const handleClick = async () => {
    if (disabled) return

    try {
      setIsLoading(true)

      const spotify = new Spotify()
      const data = await spotify.recommendations({
        seed_tracks: selectedTracks.map((track) => track.id),
      })
      setRecommendations(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {selectedTracks.length > 0 && (
        <Button
          type="submit"
          onClick={handleClick}
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 transition focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[disabled]:opacity-50 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Get Recommendations
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      )}
    </div>
  )
}
