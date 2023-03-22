export const playerReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_SONGS_ARRAY':
      return {
        ...state,
        tracklist: action.data
      }

    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentSong: action.data,
        isPlaying: false
      }

    case 'TOGGLE_PLAYING':
      return {
        ...state,
        isPlaying: action.data
      }
    
    case 'TOGGLE_SHUFFLE':
      return {
        ...state,
        isShuffle: action.data
      }
    
    case 'TOGGLE_REPEAT':
      return {
        ...state,
        isRepeat: action.data
      }

    default:
      return state
  }
}