import { MusicCategory, SoundEffectCategory } from "@/interfaces/Music";
import { getMusicList, getSoundEffectList } from "@/services/parse";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const setMusicList = createAction<{ list: MusicCategory[] }>('audios/setMusicList');
export const setSoundEffectList = createAction<{ list: SoundEffectCategory[] }>('audios/setSoundEffects');
export const loadingMusic = createAction<{ loading: boolean }>('audios/loadingMusic');
export const loadingSoundEffect = createAction<{ loading: boolean }>('audios/loadingSoundEffect');

export const getMusic = createAsyncThunk('audios/getMusicList', async (args, { dispatch, rejectWithValue }) => {
    dispatch(loadingMusic({ loading: true }));

    try {
        dispatch(setMusicList({ list: await getMusicList() }));
        dispatch(loadingMusic({ loading: false }));
    } catch (error) {
        dispatch(loadingMusic({ loading: false }));
        return rejectWithValue((error as AxiosError).response?.data?.error.data || null)
    }
});

export const getSoundEffects = createAsyncThunk('audios/getSoundEffects', async (args, { dispatch, rejectWithValue }) => {
    dispatch(loadingSoundEffect({ loading: true }));

    try {
        dispatch(setSoundEffectList({ list: await getSoundEffectList() }));
        dispatch(loadingSoundEffect({ loading: false }));
    } catch (error) {
        dispatch(loadingSoundEffect({ loading: false }));
        return rejectWithValue((error as AxiosError).response?.data?.error.data || null)
    }
})