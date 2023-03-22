import React, { ReactNode, useReducer, createContext } from "react";
import { playerReducer } from './PlayerReducer'
import { tracksData } from "../services/api";
import { TrackProps } from '../GlobalTypes';

type ContextProps = {
  currentSong: number;
  tracklist: Array<TrackProps>;
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  setCurrent: (id: number) => void;
  togglePlaying: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  prevTrack: () => void;
  nextTrack: () => void;
  handleEnd: () => void;
}

export const playerContext = createContext({} as ContextProps)

type PlayerStateProps = {
  children: ReactNode
}

export function PlayerState({ children }: PlayerStateProps) {
  const initialState = {
    currentSong: 0,
    tracklist: tracksData,
    isPlaying: false,
    isRepeat: false,
    isShuffle: false
  }

  const [state, dispatch] = useReducer(playerReducer, initialState)

  const setCurrent = (id: number) => dispatch({ type: 'SET_CURRENT_SONG', data: id })

  const togglePlaying = () => dispatch({ type: 'TOGGLE_PLAYING', data: state.isPlaying ? false : true })

  const toggleRepeat = () => dispatch({ type: 'TOGGLE_REPEAT', data: state.isRepeat ? false : true })

  const toggleShuffle = () => dispatch({ type: 'TOGGLE_SHUFFLE', data: state.isShuffle ? false : true })

  const handleEnd = () => {
    if (state.isShuffle) {
      return dispatch({
        type: 'SET_CURRENT_SONG',
        data: ~~(Math.random() * state.tracklist.length),
      })
    } else {
      if (state.isRepeat) {
        nextTrack()
      } else if (state.currentSong === state.tracklist.length - 1) {
        return
      } else {
        nextTrack()
      }
    }
  }

  const prevTrack = () => {
    if (state.currentSong === 0) {
      setCurrent(state.tracklist.length - 1)
    } else {
      setCurrent(state.currentSong - 1)
    }
  }

  const nextTrack = () => {
    if (state.currentSong === state.tracklist.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(state.currentSong + 1)
    }
  }

  return (

    < playerContext.Provider value={{
      currentSong: state.currentSong,
      tracklist: state.tracklist,
      isPlaying: state.isPlaying,
      isShuffle: state.isShuffle,
      isRepeat: state.isRepeat,
      setCurrent,
      togglePlaying,
      toggleRepeat,
      toggleShuffle,
      prevTrack,
      nextTrack,
      handleEnd
    }}
    >
      {children}
    </playerContext.Provider>
  )
}