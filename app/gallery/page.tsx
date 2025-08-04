import type { Metadata } from "next"
import Gallery from "@/components/gallery"

export const metadata: Metadata = {
  title: "Gallery - N.naaufal",
  description: "Koleksi karya vector art dan fotografi landscape terbaik",
}

export default function GalleryPage() {
  return <Gallery />
}
