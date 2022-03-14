import React from 'react'
import Comments from '@/components/Icons/Comments'
import Copy from '@/components/Icons/Copy'
import PasteIcon from '@/components/Icons/PasteIcon'
import Scissor from '@/components/Icons/Scissor'
import Trash from '@/components/Icons/Trash'
import { Menu, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { selectItemMenuState } from '@/store/slices/item-menu/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu } from '@/store/slices/item-menu/actions'
import { ItemType } from '@/constants/itemTypes'
import Stack from '@/components/Icons/Stack'
import StackSImple from '@/components/Icons/StackSImple'
import StackOutllined from '@/components/Icons/StackOutllined'
import Stacks from '@/components/Icons/Stacks'
import { selectLineItems, selectScaleFactor, selectWrapperHeight } from '@/store/slices/timeline/selectors'
import { useEditor } from '@/sdk'
import { removeItem, setTimelineItems } from '@/store/slices/timeline/actions'
import { getXfromClientX, getXfromDomElement, getZoom, recalculatePositions, setIsClip, setItemIds, setXPositionFlag, splitElement, splitItem,  } from '@/utils/timelineHelper'
import { Item } from '@/interfaces/Item'

export default function ItemMenu() {

    let { open, top, left, item, clientX } = useSelector(selectItemMenuState);
    const wrapperHeight = useSelector(selectWrapperHeight);
    const dispatch = useDispatch();
    const menuRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const editor = useEditor()
    const items = useSelector(selectLineItems);

    const scaleFactor = useSelector(selectScaleFactor);
    const zoom = getZoom(scaleFactor);

    /**
     * Set the absolute top position relative to the timeline
     * @returns {Number} the absolute top position
     */
    const getY = () =>
        !item ? (0 - top - 48 + wrapperHeight) : item?.type === 'clip' ? wrapperHeight - 240 : getItemY()


    /**
     * Get the absolute top position of the target item
     * @returns {Number} the absolute top position of the target item
     */    
    const getItemY = () =>
        item?.type === ItemType.audio ? (0 - top + 120 + wrapperHeight - 240) : (0 - top - 48 + wrapperHeight - 240)

    /**
     * Close the context menu
     */
    const close = () => {
        open = false
        dispatch(closeMenu());
    }

    /**
     * Delete the target item
     */
    const deleteItem = () => {
        editor.objects.removeById(item.id);
        dispatch(removeItem({ itemId: item.id }));
        close();
    }

    /**
     * Moves an object or a selection up in stack of drawn objects.
     */
    const bringToForward = () => {
        editor.objects.bringForwardById(item.id);
        close();
    }

    /**
     * Moves an object or the objects of a multiple selection to the top of the stack of drawn objects
     */
    const bringToFront = () => {
        editor.objects.bringToFrontById(item.id);
        close();
    }


  /**
   * Moves an object or a selection down in stack of drawn objects.
   * @retunrs
   */
    const sendBackward = () => {
        editor.objects.sendBackwardsById(item.id);
        close();
    }

      /**
   * Moves an object to specified level in stack of drawn objects.
   * @returns
   */
    const sendToBack = () => {
        editor.objects.sendToBackById(item.id);
        close();
    }

    const hasControls = () =>
        editor && item && editor.objects.findById(item?.id)[0]?.hasControls


    /**
     * Lock object movement and disable controls
     * @returns
     */
    const lock = () => {
        editor.objects.lockById(item.id);
        close();
    }

    /**
     * Unlock object movement and disable controls
     * @returns
     */
    const unlock = () => {
        editor.objects.unlockById(item.id);
        close();
    }

    /**
     * Copy Object
     * @returns
     */
    const copy = () => {
        editor.objects.copyById(item.id);
        close();
    }

    /**
     * Paste Object
     * @returns
     */
    const paste = () => {
        setItemIds(items);
        setXPositionFlag(getXfromDomElement(document.getElementById("playheadWrapper")) / zoom);
        setIsClip(item?.type === ItemType.clip);
        editor.objects.paste();
        close();
    }

    const comment = () => { }

    /**
     * Split target item
     * @returns
     */
    const split = () => {
        const { trimmedItem, newItem } = splitElement(item, clientX, zoom);
        let newItemsState = splitItem(items, trimmedItem as Item, newItem as Item);
        newItemsState = recalculatePositions(newItemsState);
        dispatch(setTimelineItems({ items: newItemsState }));
        close();
    }

    React.useEffect(() => {
        const onEscape = (ev: KeyboardEvent) => {
            if (ev.key === 'Escape' && open && dispatch) {
                console.log(ev.key)
                close();
            }
        }

        window.addEventListener('keyup', onEscape)
        return () => window.removeEventListener('keyup', onEscape);
    }, [dispatch])

    React.useEffect(() => {
        const onClick = (ev: MouseEvent) => {
            const { x, y } = menuRef.current.getBoundingClientRect();
            const menuOffset = x + menuRef.current.offsetWidth;
            const menuYOffset = y + menuRef.current.offsetHeight;

            if (ev.clientX > x && ev.clientX < menuOffset && ev.clientY > y && ev.clientY < menuYOffset) {
                ev.preventDefault();
            } else {
                dispatch(closeMenu());
            }
        }

        window.addEventListener('mousedown', onClick);
        return () => window.removeEventListener('mousedown', onClick);
    }, [dispatch, open, menuRef])

    return (
        <div style={{
            position: 'absolute',
            top: getY(),
            left: left,
            // marginLeft: '50%',
        }}>

            <div style={{ position: "relative", zIndex: 999 }}>
                <Menu
                    isOpen={open}
                    direction="rtl"
                >
                    <MenuList
                        ref={menuRef}
                        sx={{
                            border: 'none',
                            boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {
                            item &&
                            <MenuItem onClick={copy}>
                                <Copy styles={{ marginRight: "21px" }} />
                                copy
                            </MenuItem>
                        }
                        <MenuItem onClick={paste}>
                            <PasteIcon styles={{ marginRight: "21px" }} />
                            paste
                        </MenuItem>
                        {
                            item &&
                            <>
                                <MenuItem onClick={split}>
                                    <Scissor styles={{ marginRight: "21px", transform: 'rotate(180deg)' }} size={24} />
                                    split
                                </MenuItem>
                                <MenuItem onClick={deleteItem}>
                                    <Trash styles={{ marginRight: "21px" }} />
                                    delete
                                </MenuItem>
                            </>
                        }
                        {
                            item && (item?.type !== ItemType.audio) &&
                            <>
                                <MenuDivider mx="15px" bgColor="#ededed" borderColor="#dedede" />

                                <MenuItem onClick={bringToFront}>
                                    <Stack styles={{ marginRight: "21px" }} />
                                    bring to front
                                </MenuItem>

                                <MenuItem onClick={bringToForward}>
                                    <StackSImple styles={{ marginRight: "21px" }} />
                                    bring forward
                                </MenuItem>

                                <MenuItem onClick={sendBackward}>
                                    <StackOutllined styles={{ marginRight: "21px" }} />
                                    send backward
                                </MenuItem>

                                <MenuItem onClick={sendToBack}>
                                    <Stacks styles={{ marginRight: "21px" }} />
                                    send to back
                                </MenuItem>
                            </>
                        }

                        {/* <MenuDivider mx="15px" bgColor="#ededed" borderColor="#dedede" /> */}
                        {/* <MenuItem onClick={hasControls() ? lock : unlock}>
                            <Lock styles={{ marginRight: "21px" }} />
                            {hasControls() ? "lock" : "unlock"}
                        </MenuItem> */}
                        <MenuDivider mx="15px" bgColor="#ededed" borderColor="#dedede" />
                        <MenuItem onClick={comment}>
                            <Comments styles={{ marginRight: "21px" }} />
                            comment
                        </MenuItem>
                    </MenuList>

                </Menu>
            </div>

        </div>
    )
}
