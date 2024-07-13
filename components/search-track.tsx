"use client"

import { useState } from "react"
import { Button, Input } from "@headlessui/react"
import { useAtom } from "jotai"

import { searchResultAtom } from "@/lib/atom"
import { Spotify } from "@/lib/spotify"
import { cn } from "@/lib/utils"

export function SearchTrack() {
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const disabled = !search || search.trim() === "" || isLoading

  const [_, setResults] = useAtom(searchResultAtom)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (disabled) return

    try {
      setIsLoading(true)

      const spotify = new Spotify()
      const data = await spotify.search(search)
      setResults(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center gap-2">
        <Input
          className={cn(
            "block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a track"
          required
        />
        <Button
          disabled={disabled}
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 transition focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[disabled]:opacity-50 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
          Search
        </Button>
      </div>
    </form>
  )
}
