import { ClipItem } from "@/interfaces/ClipItem";
import { Item } from "@/interfaces/Item";
import { createReducer } from "@reduxjs/toolkit";
import { closeMenu, openMenu } from "./actions";

interface ItemMenuState {
    open: boolean;
    top: number;
    left: number;
    item: Item | ClipItem;
    clientX: number;
}

const initialState: ItemMenuState = {
    open: false,
    top: 0,
    left: 0,
    item: null,
    clientX: 0
}

export const itemMenuReducer = createReducer(initialState, builder => {
    builder.addCase(openMenu, (state, { payload }) => {
        state.open = true;
        state.item = payload.item;
        state.left = payload.left;
        state.top = payload.top;
        state.clientX = payload.clientX
    });

    builder.addCase(closeMenu, (state) => {
        state.open = false;
        state.item = null;
    })
});