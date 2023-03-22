import { PlaylistHeader } from '../components/PLaylistHeader'
import { PlaylistItems } from '../components/PlaylistItem';
import { headerInfo } from '../services/api'
import { Controls } from '../components/Controls';
import { PlayerState } from '../Contexts/PlayerContext';

export function MusicPlayer() {
  return (
    <PlayerState>
      <div className="music-player-container">
        <PlaylistHeader {...headerInfo} />
        <PlaylistItems />
      </div>
      <Controls />
    </PlayerState>
  )
}