import { useState } from "react"
import { Button } from "@headlessui/react"
import { useAtom } from "jotai"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

import { recommendationsAtom } from "@/lib/atom"
import { Spotify } from "@/lib/spotify"

export function CreatePlaylistButton({ session }: { session: Session }) {
  const [recommendations] = useAtom(recommendationsAtom)
  const [isLoading, setIsLoading] = useState(false)
  if (!recommendations) return null

  const handleClick = async () => {
    if (!session) return signIn()

    setIsLoading(true)
    try {
      const spotify = new Spotify()

      await spotify.createPlaylist({
        name: "Recommended Tracks",
        description: "Recommended tracks based on your selections",
        accessToken: session.user.access_token,
        tracks: recommendations,
        userId: session.user.id,
      })

      toast.success("Playlist created successfully")
    } catch (error) {
      toast.error("Failed to create playlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className="inline-flex items-center gap-1 rounded bg-white/5 px-1.5 text-sm text-gray-400 hover:cursor-pointer data-[disabled]:opacity-50"
      onClick={handleClick}
      disabled={isLoading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="size-4"
      >
        <path d="M3 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3Z" />
        <path
          fillRule="evenodd"
          d="M3 6h10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm3 2.75A.75.75 0 0 1 6.75 8h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 8.75Z"
          clipRule="evenodd"
        />
      </svg>
      Create Playlist
    </Button>
  )
}
