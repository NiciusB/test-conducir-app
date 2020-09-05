import audioFail from '../assets/audio/fail.mp3'
import audioWin from '../assets/audio/win.mp3'
import { useEffect } from 'react'

const audios = {
  win: new Audio(audioWin),
  fail: new Audio(audioFail),
}

export default function useAudioWinFail({ shouldPlay, hasWon }) {
  useEffect(() => {
    if (!shouldPlay) return
    const audio = audios[hasWon ? 'win' : 'fail']
    audio.pause()
    audio.currentTime = 0
    audio.play()
  }, [shouldPlay, hasWon])
}
