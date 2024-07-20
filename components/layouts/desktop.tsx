import { Session } from "next-auth"

import { RecommendationsList, SearchList } from "@/components/list"
import { PreviewTrack } from "@/components/preview-track"
import { SelectedTracks } from "@/components/selected-tracks"

export function DesktopLayout({ session }: { session: Session }) {
  return (
    <div className="grid w-full max-w-7xl grid-cols-3 gap-12">
      <div>
        <SelectedTracks />
        <PreviewTrack />
      </div>
      <SearchList />
      <RecommendationsList session={session} />
    </div>
  )
}
