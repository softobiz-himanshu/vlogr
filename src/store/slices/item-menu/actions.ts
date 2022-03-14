import { ClipItem } from "@/interfaces/ClipItem";
import { Item } from "@/interfaces/Item";
import { createAction } from "@reduxjs/toolkit";

interface OpenMenuPayload {
    top: number;
    left: number;
    item: Item | ClipItem;
    clientX: number
}

export const openMenu = createAction<OpenMenuPayload>('itemMenu/open');
export const closeMenu = createAction('itemMenu/close');