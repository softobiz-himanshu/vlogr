import { ItemType } from "@/constants/itemTypes";
import { ClipItem } from "@/interfaces/ClipItem";
import { Item } from "@/interfaces/Item";

export const clipItems: ClipItem[] = [{
    id: '9',
    width: 500,
    x: 0,
    type: ItemType.clip,
    subType: ItemType.video,
    cutFrom: 0,
    cutTo: 500,
    maxWidth: Infinity,
    prevHeadWidth: 500,
    prevTailWidth: 500
}];
export const items: Item[] = [
    { id: '1', name: 'Element1', width: 202, type: ItemType.element, x: 0, y: 0 },
    { id: '2', name: 'Text1', width: 202, type: ItemType.text, x: 202, y: 0 },
    { id: '3', name: 'Audio1', width: 202, type: ItemType.audio, x: 406, y: 0 },
    { id: '4', name: 'Element2', width: 202, type: ItemType.element, x: 0, y: 40 },
    { id: '5', name: 'Text2', width: 202, type: ItemType.text, x: 202, y: 40 },
    { id: '6', name: 'Audio2', width: 202, type: ItemType.audio, x: 406, y: 40 },
];