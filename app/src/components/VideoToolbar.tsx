import { Maximize2, Minimize2, Pause, Play } from "lucide-react"

export function VideoToolbar({
  isExpanded,
  isPlaying,
  onToggleExpanded,
  onTogglePlaying,
}: {
  isExpanded: boolean
  isPlaying: boolean
  onToggleExpanded: () => void
  onTogglePlaying: () => void
}) {
  const PlaybackIcon = isPlaying ? Pause : Play
  const SizeIcon = isExpanded ? Minimize2 : Maximize2

  return (
    <div className="video-toolbar" aria-label="Video toolbar">
      <button
        type="button"
        className="video-toolbar-button"
        aria-label={isPlaying ? "Pause video" : "Play video"}
        title={isPlaying ? "Pause" : "Play"}
        onClick={onTogglePlaying}
      >
        <PlaybackIcon aria-hidden="true" size={16} strokeWidth={2} fill={isPlaying ? "none" : "currentColor"} />
      </button>
      <button
        type="button"
        className="video-toolbar-button"
        aria-label={isExpanded ? "Back to original size" : "Open video fullscreen"}
        title={isExpanded ? "Back to original size" : "Fullscreen"}
        onClick={onToggleExpanded}
      >
        <SizeIcon aria-hidden="true" size={16} strokeWidth={2} />
      </button>
    </div>
  )
}
