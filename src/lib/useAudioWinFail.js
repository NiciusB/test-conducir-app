import audioFail from '../assets/audio/fail.mp3'
import audioWin from '../assets/audio/win.mp3'
import { useEffect } from 'react'

export default function useAudioWinFail ({ shouldPlay, hasWon }) {
  useEffect(() => {
    if (!shouldPlay) return
    new Audio(hasWon ? audioWin : audioFail).play()
  }, [shouldPlay, hasWon])
}

function preloadAudio () {
  // eslint-disable-next-line no-new
  new Audio(audioWin)
  // eslint-disable-next-line no-new
  new Audio(audioFail)
}
preloadAudio()
