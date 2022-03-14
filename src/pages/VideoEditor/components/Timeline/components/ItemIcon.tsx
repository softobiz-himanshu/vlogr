import React from 'react'
import CircleWavy from '@/components/Icons/CircleWavy'
import MusicNote from '@/components/Icons/MusicNote'
import TextAa from '@/components/Icons/TextAa'
import { ItemType } from '@/constants/itemTypes'
import VideoCamera from '@/components/Icons/VideoCamera'

interface ItemIconProps {
    itemType: ItemType
}

export default function ItemIcon({ itemType }: ItemIconProps) {

    if (itemType === ItemType.element || itemType === ItemType.gif) {
        return <CircleWavy styles={{ marginRight: '6px', display: 'inline' }} />
    }

    if (itemType === ItemType.audio) {
        return <MusicNote style={{ marginRight: '6px', display: 'inline' }} />
    }

    if (itemType === ItemType.text) {
        return <TextAa style={{ marginRight: '6px', display: 'inline' }} />
    }

    if (itemType === ItemType.video) {
        return <VideoCamera styles={{ marginRight: '6px', display: 'inline' }} />
    }

    return null;
}
