import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { VideoToolbar } from "@/components/VideoToolbar"

export function VideoOverlay({
  label,
  objectPosition,
  onClose,
  src,
}: {
  label: string
  objectPosition?: string
  onClose: () => void
  src: string
}) {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.body.classList.add("video-overlay-open")
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.classList.remove("video-overlay-open")
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  function togglePlayback() {
    const video = videoRef.current
    if (!video) {
      console.warn("Could not toggle video playback because the video element was not available.")
      return
    }

    if (video.paused) {
      video.play().catch((error) => console.warn("Could not play video.", error))
      return
    }

    video.pause()
  }

  return createPortal(
    <div className="video-fullscreen-overlay" role="dialog" aria-label={`${label} fullscreen video`}>
      <button type="button" className="video-fullscreen-backdrop" aria-label="Back to original size" onClick={onClose} />
      <div className="video-fullscreen-stage">
        <video
          ref={videoRef}
          src={src}
          aria-label={label}
          autoPlay
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          loop
          muted
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{ objectPosition }}
        />
        <VideoToolbar
          isExpanded
          isPlaying={isPlaying}
          onToggleExpanded={onClose}
          onTogglePlaying={togglePlayback}
        />
      </div>
    </div>,
    document.body
  )
}
