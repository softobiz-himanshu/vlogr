import { ItemType } from "@/constants/itemTypes";

export interface Item {
    id: string;
    name: string;
    width: number;
    type: ItemType;
    x: number;
    y: number;
    clipParentId?: string;
    maxWidth?: number;
    cutFrom?: number;
    cutTo?: number;
    prevHeadWidth?: number;
    prevTailWidth?: number;
}