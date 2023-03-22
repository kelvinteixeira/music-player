import playlistCover from '../assets/Covers/playlist.jpg'

type HeaderProps = {
  title: string;
  subtitle: string
}

export function PlaylistHeader(props: HeaderProps) {
  return (
    <div className="header-container">
      <div className="header-background" />
      <div className="header-content">
        <div className='header-cover-box' >
          <img src={playlistCover} alt="" className="header-cover" />
        </div>
        <div className="info">
          <h3>{props.title}</h3>
          <h6>{props.subtitle}</h6>
        </div>
      </div>
    </div>
  )
}