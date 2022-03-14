import { ItemType } from "@/constants/itemTypes";

export interface ClipItem {
    id: string;
    width: number;
    x: number;
    type: ItemType.clip;
    src?: string;
    subType: ItemType;

    maxWidth?: number;
    cutFrom?: number;
    cutTo?: number;
    prevHeadWidth?: number;
    prevTailWidth?: number;
}