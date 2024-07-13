export class Spotify {
  clientId: string
  clientSecret: string
  baseUrl: string

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_AUTH_SPOTIFY_ID!
    this.clientSecret = process.env.NEXT_PUBLIC_AUTH_SPOTIFY_SECRET!
    this.baseUrl = "https://api.spotify.com/v1"
  }

  private async getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
      },
      body: "grant_type=client_credentials",
    })

    const data = (await response.json()) as {
      access_token: string
      token_type: string
      scope: string
      expires_in: number
      refresh_token: string
    }

    return data.access_token
  }

  async search(query: string) {
    const accessToken = await this.getAccessToken()
    const response = await fetch(
      `${this.baseUrl}/search?q=${query}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = (await response.json()) as SpotifySearchResponse

    return data.tracks
  }

  async recommendations({ seed_tracks }: { seed_tracks: string[] }) {
    const accessToken = await this.getAccessToken()
    const response = await fetch(
      `${this.baseUrl}/recommendations?seed_tracks=${seed_tracks.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = (await response.json()) as SpotifyRecommendationResponse

    return data.tracks
  }

  async createPlaylist({
    name,
    description,
    tracks,
    accessToken,
    userId,
  }: {
    name: string
    description: string
    tracks: Track[]
    accessToken: string
    userId: string
  }) {
    const response = await fetch(`${this.baseUrl}/users/${userId}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        public: false,
      }),
    })

    const data = (await response.json()) as { id: string }

    await fetch(`${this.baseUrl}/playlists/${data.id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: tracks.map((track) => track.uri),
      }),
    })

    return data.id
  }
}
