import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const searchResultAtom = atom<SpotifySearchResponse["tracks"] | null>(
  null
)

export const selectedTrackAtom = atomWithStorage<Track[]>("selectedTracks", [])

export const recommendationsAtom = atomWithStorage<
  SpotifyRecommendationResponse["tracks"] | null
>("recommendations", null)

export const previewTrackAtom = atom<Track | null>(null)

export const volumeMuteAtom = atomWithStorage<boolean>("volumeMute", false)
