"use client"

import { useState } from "react"
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useAtom } from "jotai"
import { Session } from "next-auth"

import { selectedTrackAtom } from "@/lib/atom"
import { RecommendationsList, SearchList } from "@/components/list"
import { RecommendationsButton } from "@/components/recommendations-button"

export function MobileLayout({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false)

  const [selectedTracks, setSelectedTracks] = useAtom(selectedTrackAtom)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
  return (
    <div className="flex flex-col gap-6">
      {selectedTracks.length > 0 && (
        <>
          <Button
            onClick={open}
            className="absolute left-10 top-10 rounded-md bg-black/20 p-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <DialogTitle
                      as="h3"
                      className="text-base/7 font-medium text-white"
                    >
                      Selected Track{selectedTracks.length === 1 ? "" : "s"} (
                      {selectedTracks.length})
                    </DialogTitle>
                    <Button
                      className="inline-flex items-center gap-1 rounded bg-white/5 px-1.5 text-sm text-gray-400"
                      onClick={() => setSelectedTracks([])}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                      </svg>
                      Clear
                    </Button>
                  </div>
                  <div className="mt-4">
                    <ul className="mb-4 flex flex-col gap-2">
                      {selectedTracks.map((track) => (
                        <li
                          key={track.id}
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="size-4 transition hover:cursor-pointer hover:fill-red-400"
                            onClick={() =>
                              setSelectedTracks(
                                selectedTracks.filter((t) => t.id !== track.id)
                              )
                            }
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {track.artists
                            .map((artist) => artist.name)
                            .join(", ")}{" "}
                          - {track.name}
                        </li>
                      ))}
                    </ul>
                    <RecommendationsButton />
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      )}
      <SearchList />
      <RecommendationsList session={session} />
    </div>
  )
}
