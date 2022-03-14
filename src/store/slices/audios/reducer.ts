import { MusicCategory, SoundEffectCategory } from "@/interfaces/Music";
import { createReducer } from "@reduxjs/toolkit";
import { loadingMusic, loadingSoundEffect, setMusicList, setSoundEffectList } from "./actions";

interface AudiosState {
    musicList: MusicCategory[];
    soundEffectList: SoundEffectCategory[];
    loadingMusic: boolean;
    loadingSoundEffect: boolean;
}

const initialState: AudiosState = {
    musicList: [],
    soundEffectList: [],
    loadingMusic: false,
    loadingSoundEffect: false
}

export const audiosReducer = createReducer(initialState, builder => {
    builder.addCase(setMusicList, (state, { payload }) => {
        state.musicList = payload.list;
    });

    builder.addCase(setSoundEffectList, (state, { payload }) => {
        state.soundEffectList = payload.list;
    });

    builder.addCase(loadingMusic, (state, { payload }) => {
        state.loadingMusic = payload.loading
    })
    builder.addCase(loadingSoundEffect, (state, { payload }) => {
        state.loadingSoundEffect = payload.loading
    })
})