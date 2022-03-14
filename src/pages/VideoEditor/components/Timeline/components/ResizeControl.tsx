import { useResizeContext } from '@/contexts/ResizeProvider'
import { ClipItem } from '@/interfaces/ClipItem';
import { Item } from '@/interfaces/Item';
import { selectItemMenuState } from '@/store/slices/item-menu/selectors';
import React from 'react'
import { useSelector } from 'react-redux';

interface ResizeControlProps {
    side: 'left' | 'right';
    item: Item | ClipItem;
}

export default function ResizeControl({ item, side }: ResizeControlProps) {
    const { selectedItemId, isResizeActive } = useResizeContext();
    const { open: isMenuOpen, item: itemMenuElement } = useSelector(selectItemMenuState);

    const resizeIsEnabled = () => isResizeActive && selectedItemId === item.id;
    const menuIsOpen = () => isMenuOpen && itemMenuElement?.id === item.id;

    const displayMenu = () => menuIsOpen() || resizeIsEnabled();

    if (side === 'left') {
        return (
            <div style={{
                top: `0px`,
                left: 0,
                marginTop: 0,
                display: displayMenu() ? 'flex' : 'none',
                // display: 'flex',
                position: "absolute",
                height: "100%",
                background: '#3782f7',
                padding: '0 3px',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div
                    style={{
                        width: '2px',
                        backgroundColor: '#fff',
                        height: '12px',
                        borderRadius: '2px',
                        marginRight: '2px'
                    }}
                />

                <div
                    style={{
                        width: '2px',
                        backgroundColor: '#fff',
                        height: '12px',
                        borderRadius: '2px'
                    }}
                />

            </div>
        )
    }

    return (
        <div style={{
            top: `0px`,
            right: 0,
            marginTop: 0,
            display: displayMenu() ? 'flex' : 'none',
            position: "absolute",
            height: "100%",
            background: '#3782f7',
            padding: '0 3px',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            justifyContent: 'center',
            alignItems: 'center'

        }}>
            <div
                style={{
                    width: '2px',
                    backgroundColor: '#fff',
                    height: '12px',
                    borderRadius: '2px',
                    marginRight: '2px'
                }}
            />

            <div
                style={{
                    width: '2px',
                    backgroundColor: '#fff',
                    height: '12px',
                    borderRadius: '2px'
                }}
            />

        </div>
    )

}
