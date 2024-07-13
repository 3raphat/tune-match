type ExternalUrls = {
  spotify: string
}

type Image = {
  url: string
  height: number
  width: number
}

type Restrictions = {
  reason: string
}

type Followers = {
  href: string | null
  total: number
}

type Paging<T> = {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: T[]
}

type Album = {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions?: Restrictions
  type: "album"
  uri: string
  artists: SimplifiedArtist[]
}

type SimplifiedArtist = {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: "artist"
  uri: string
}

type Artist = SimplifiedArtist & {
  followers: Followers
  genres: string[]
  images: Image[]
  popularity: number
}

type Track = {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
    ean: string
    upc: string
  }
  external_urls: ExternalUrls
  href: string
  id: string
  is_playable: boolean
  linked_from: {}
  restrictions?: Restrictions
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: "track"
  uri: string
  is_local: boolean
}

type User = {
  external_urls: ExternalUrls
  followers: Followers
  href: string
  id: string
  type: "user"
  uri: string
  display_name: string
}

type Playlist = {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  owner: User
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    total: number
  }
  type: string
  uri: string
}

type Show = {
  available_markets: string[]
  copyrights: Copyright[]
  description: string
  html_description: string
  explicit: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  is_externally_hosted: boolean
  languages: string[]
  media_type: string
  name: string
  publisher: string
  type: "show"
  uri: string
  total_episodes: number
}

type Episode = {
  audio_preview_url: string
  description: string
  html_description: string
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  is_externally_hosted: boolean
  is_playable: boolean
  language: string
  languages: string[]
  name: string
  release_date: string
  release_date_precision: string
  resume_point: {
    fully_played: boolean
    resume_position_ms: number
  }
  type: "episode"
  uri: string
  restrictions?: Restrictions
}

type Audiobook = {
  authors: { name: string }[]
  available_markets: string[]
  copyrights: Copyright[]
  description: string
  html_description: string
  edition: string
  explicit: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  languages: string[]
  media_type: string
  name: string
  narrators: { name: string }[]
  publisher: string
  type: "audiobook"
  uri: string
  total_chapters: number
}

type Copyright = {
  text: string
  type: string
}

type SpotifySearchResponse = {
  tracks: Paging<Track>
  artists: Paging<Artist>
  albums: Paging<Album>
  playlists: Paging<Playlist>
  shows: Paging<Show>
  episodes: Paging<Episode>
  audiobooks: Paging<Audiobook>
}

type Seed = {
  afterFilteringSize: number
  afterRelinkingSize: number
  href: string
  id: string
  initialPoolSize: number
  type: string
}

type SpotifyRecommendationResponse = {
  seeds: Seed[]
  tracks: Track[]
}
