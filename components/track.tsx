import { Fragment } from "react"
import Image from "next/image"
import { useAtom } from "jotai"
import { toast } from "sonner"
import useSound from "use-sound"

import { previewTrackAtom, selectedTrackAtom, volumeMuteAtom } from "@/lib/atom"
import { cn } from "@/lib/utils"

export function Track({ track }: { track: Track }) {
  const [selectedTracks, setSelectedTracks] = useAtom(selectedTrackAtom)

  const isSelected = selectedTracks.some((t) => t.id === track.id)

  const handleClick = () => {
    if (isSelected) {
      setSelectedTracks((prev) => prev.filter((t) => t.id !== track.id))
    } else {
      if (selectedTracks.length < 5) {
        setSelectedTracks((prev) => [...prev, track])
      } else {
        toast.error("You can only select up to 5 tracks.")
      }
    }
  }

  const [volumeMute] = useAtom(volumeMuteAtom)

  const [_, setPreviewTrack] = useAtom(previewTrackAtom)

  const [play, { stop }] = useSound(
    track?.preview_url?.split("?")[0] + ".mp3",
    {
      volume: 0.4,
    }
  )

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg p-2 hover:cursor-pointer",
        isSelected ? "bg-green-500/10" : " hover:bg-white/5"
      )}
      onClick={handleClick}
      onMouseEnter={() => {
        setPreviewTrack(track)
        if (!volumeMute) {
          play()
        }
      }}
      onMouseLeave={() => {
        setPreviewTrack(null)
        stop()
      }}
    >
      <div className="flex gap-3">
        <div className="relative aspect-square size-[40px] min-w-fit">
          <Image
            src={track.album.images[0].url}
            alt={track.name}
            fill
            sizes="40px"
            className="rounded object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="line-clamp-1 text-gray-100">
            <a
              href={track.external_urls.spotify}
              className="hover:underline"
              target="_blank"
            >
              {track.name}
            </a>
          </p>
          <p className="line-clamp-1 text-sm text-gray-500">
            {track.artists.map((artist, index) => (
              <Fragment key={artist.id}>
                {index > 0 && ", "}
                <a
                  href={artist.external_urls.spotify}
                  className="hover:underline"
                  target="_blank"
                >
                  {artist.name}
                </a>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
      <span
        style={{
          fontVariantNumeric: "tabular-nums",
        }}
        className="inline-flex items-center gap-0.5 rounded-full bg-white/5 px-1.5 text-center text-sm text-gray-300 shadow-inner shadow-white/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={cn(
            "size-4",
            track.popularity > 75
              ? "text-red-500"
              : track.popularity > 50
                ? "text-orange-500"
                : track.popularity > 25
                  ? "text-yellow-500"
                  : "text-gray-500"
          )}
        >
          <path
            fillRule="evenodd"
            d="M8.074.945A4.993 4.993 0 0 0 6 5v.032c.004.6.114 1.176.311 1.709.16.428-.204.91-.61.7a5.023 5.023 0 0 1-1.868-1.677c-.202-.304-.648-.363-.848-.058a6 6 0 1 0 8.017-1.901l-.004-.007a4.98 4.98 0 0 1-2.18-2.574c-.116-.31-.477-.472-.744-.28Zm.78 6.178a3.001 3.001 0 1 1-3.473 4.341c-.205-.365.215-.694.62-.59a4.008 4.008 0 0 0 1.873.03c.288-.065.413-.386.321-.666A3.997 3.997 0 0 1 8 8.999c0-.585.126-1.14.351-1.641a.42.42 0 0 1 .503-.235Z"
            clipRule="evenodd"
          />
        </svg>
        {track.popularity}
      </span>
    </div>
  )
}
