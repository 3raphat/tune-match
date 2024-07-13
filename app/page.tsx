import { auth } from "@/auth"

import { RecommendationsList, SearchList } from "@/components/list"
import { PreviewTrack } from "@/components/preview-track"
import { SearchTrack } from "@/components/search-track"
import { SelectedTracks } from "@/components/selected-tracks"
import { VolumeToggle } from "@/components/volume-toggle"

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex flex-col items-center gap-6 py-12">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold">Tune Match</h1>
        <p className="max-w-md text-balance text-center text-gray-500">
          Find your perfect playlist by selecting your favorite tracks.
        </p>
        <VolumeToggle />
      </div>
      <SearchTrack />
      <div className="grid w-full max-w-7xl grid-cols-3 gap-12">
        <div>
          <SelectedTracks />
          <PreviewTrack />
        </div>
        <SearchList />
        <RecommendationsList session={session!} />
      </div>
    </main>
  )
}
