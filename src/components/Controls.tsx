import { useContext, useState, useRef } from 'react'
import {
  BsFillPlayCircleFill,
  BsPauseCircleFill,
  BsFillSkipForwardCircleFill,
  BsFillSkipBackwardCircleFill,
  BsShuffle,
  BsRepeat,
} from 'react-icons/bs'
import { playerContext } from '../Contexts/PlayerContext'
export function Controls() {

  const {
    isPlaying,
    currentSong,
    handleEnd,
    isRepeat,
    isShuffle,
    nextTrack,
    prevTrack,
    setCurrent,
    togglePlaying,
    toggleRepeat,
    toggleShuffle,
    tracklist,
  } = useContext(playerContext)

  const [trackDuration, setTrackDurationn] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  let audio = useRef<HTMLAudioElement | null>(null)

  function toggleAudio() {
    audio.current?.paused ? audio.current.play() : audio.current?.pause()
  }

  function handleProgress(value: number) {
    let calculateTime = (value * trackDuration)
    setCurrent(calculateTime)
    audio.current.currentTime = calculateTime
  }

  function formatiMusicTime(seconds: number) {
    return (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + ~~seconds
  }

  function toLimitString(value: string) {
    if (value.length > 26) {
      return value.substring(0, 25) + '...';
    } else {
      return value + '.'
    }
  }

  return (
    <div className="control-container">
      <audio ref={audio}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onCanPlay={(e) => setTrackDurationn(e.currentTarget.duration)}
        onEnded={handleEnd}
        preload='true'
        src={tracklist[currentSong].trackUrl}
      />
      <div className="buttons-container">
        <button className='btn' onClick={toggleRepeat}>
          <BsRepeat className={'btn-change-music ' + (isRepeat ? 'active-control' : '')} />
        </button >
        <button className='btn' onClick={() => {
          prevTrack()
          toggleAudio()
        }} >
          <BsFillSkipBackwardCircleFill className='btn-change-music' />
        </button >
        <button className='btn' onClick={() => {
          togglePlaying()
          toggleAudio()
        }} >
          {isPlaying ? <BsPauseCircleFill className='btn-icon' /> : <BsFillPlayCircleFill className='btn-icon' />}
        </button >
        <button className='btn' onClick={nextTrack}>
          <BsFillSkipForwardCircleFill className='btn-change-music' />
        </button >
        <button className='btn' onClick={toggleShuffle}>
          <BsShuffle className={'btn-change-music ' + (isShuffle ? 'active-control' : '')} />
        </button >
      </div>
      <div className='info-player'>
        <h4>{toLimitString(tracklist[currentSong].artistName)} &nbsp;- &nbsp;</h4>
        <h6>{toLimitString(tracklist[currentSong].title)}</h6>
      </div>
      <progress
        className="progressbar"
        value={trackDuration ? (currentTime * 100) / trackDuration : 0}
        max="100"
        onClick={(e) =>
          handleProgress(
            ((e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth) * 100
          )
        }
      ></progress>
      <div>
        <span className='current-time'>{formatiMusicTime(currentTime)}</span>
        <span className='total-time' > / {formatiMusicTime(trackDuration)}</span>
      </div>


    </div >
  )
}