import { auth } from "@/auth"

import { DesktopLayout } from "@/components/layouts/desktop"
import { MobileLayout } from "@/components/layouts/mobile"
import { SearchTrack } from "@/components/search-track"
import { VolumeToggle } from "@/components/volume-toggle"

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex flex-col items-center gap-6 px-4 py-12">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold">Tune Match</h1>
        <p className="max-w-md text-balance text-center text-gray-500">
          Find your perfect playlist by selecting your favorite tracks.
        </p>
        <VolumeToggle />
      </div>
      <SearchTrack />
      <div className="block lg:hidden">
        <MobileLayout session={session!} />
      </div>
      <div className="hidden lg:block">
        <DesktopLayout session={session!} />
      </div>
    </main>
  )
}
