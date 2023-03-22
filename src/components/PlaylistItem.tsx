import { useContext } from "react";
import { playerContext } from '../Contexts/PlayerContext'

export function PlaylistItems() {

  const { tracklist, currentSong, setCurrent, isPlaying } = useContext(playerContext)

  return (
    <>
      {
        tracklist.map((track, index) => (
          <div
            className='music-container' key={track.id}>
            <div
              className={"music-content " + (currentSong === index ? 'active' : '')}

              onClick={() => {
                setCurrent(index)
              }}
            >
              <img src={track.cover} alt={track.title} className="music-cover" />
              <div className="music-name">
                <h4>{track.artistName}&nbsp;-</h4> &nbsp;
                <h6> {track.title}</h6>
              </div>
            </div>
          </div>
        )
        )
      }
    </>
  )
}