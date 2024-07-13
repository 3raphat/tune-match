import { atomWithStorage } from "jotai/utils"

export const searchResultAtom = atomWithStorage<
  SpotifySearchResponse["tracks"] | null
>("searchResult", null)

export const selectedTrackAtom = atomWithStorage<Track[]>("selectedTracks", [])

export const recommendationsAtom = atomWithStorage<
  SpotifyRecommendationResponse["tracks"] | null
>("recommendations", null)

export const previewTrackAtom = atomWithStorage<Track | null>(
  "previewTrack",
  null
)
