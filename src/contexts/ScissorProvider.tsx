import { ClipItem } from '@/interfaces/ClipItem'
import { Item } from '@/interfaces/Item'
import { selectScaleFactor } from '@/store/slices/timeline/selectors';
import React from 'react'
import { useSelector } from 'react-redux';
import { useMousseContext } from './MousseContext';
import { v4 as uuid4 } from 'uuid'
import scissor from '../assets/images/Scissors.svg'
import { getZoom, splitElement } from '@/utils/timelineHelper';

/**
 * Scissor state
 */
interface ScissorState {
    /**
     * Cursor position relative to the hovered item
     */
    cursorPosition: number;

    /**
     * Whether the item is being hovered
     */
    isHovering: boolean;

    /**
     * Function that changes the state when the scissor is over the item
     * @param ev Mouse Evenet
     * @param {String} id item id
     * @returns
     */
    onScissorOver: (ev: any, id: string) => void;

    /**
     * Function to crop an item
     * @param ev Mousse event
     * @param item Timeline item or clip
     * @param split callback function to crop an item
     * @returns
     */
    cropElement: (
        ev: any,
        item: Item | ClipItem,
        split: (item: Item | ClipItem, trimmedItem: Item | ClipItem) => void
    ) => void;

    /**
     * Function that changes the state when cursor leaves the item
     * @returns
     */
    onScissorLeave: () => void;


    itemId: string | number;
}


const ScissorContext = React.createContext<ScissorState>({
    cursorPosition: 0,
    isHovering: false,
    itemId: '',
    onScissorLeave: () => { },
    onScissorOver: (ev: any, id: string) => { },
    cropElement: (ev: any, item: Item | ClipItem) => { }
});

export const ScissorProvider: React.FC = ({ children }) => {
    const [cursorPosition, setCursorPosition] = React.useState(0);
    const [itemId, setItemId] = React.useState<number | string | null>(null);
    const [isHovering, setIsHovering] = React.useState(false);

    const { cursor } = useMousseContext();
    const scaleFactor = useSelector(selectScaleFactor);

    /**
     * Get the position relative to an HTML element
     * @param ev Mousse event
     * @param el HTML Element
     * @returns {Number} cursor position relative to an HTML element
     */
    const getCursorPosition = (ev: any, el: HTMLDivElement) => {
        const rect = el.getBoundingClientRect();
        return ev.clientX - rect.left;
    }

    const isScissorSelected = () => cursor.includes('url(' + scissor + ')');

    /**
     * Allows to split an item
     * @param ev Mousse event
     * @param item Timeline item or clip
     * @param split Callback function to split an item
     * @returns 
     */
    const cropElement = (
        ev: any,
        item?: Item | ClipItem,
        split?: (item: Item | ClipItem, trimmedItem: Item | ClipItem) => void
    ) => {
        if (!isScissorSelected()) return;
        const zoom = getZoom(scaleFactor);
        const { trimmedItem, newItem } = splitElement(item, ev.clientX, zoom);
        split(trimmedItem as Item | ClipItem, newItem as Item | ClipItem)

    }

    /**
     * Changes the state when cursor is over the item
     * @param ev Mouse event
     * @param {String} id item or clip id
     * @returns 
     */
    const onScissorOver = (ev: any, id: string) => {
        ev.stopPropagation();
        ev.preventDefault();
        if (!isScissorSelected()) return;


        const element = document.querySelector(`.item-${id}`) as HTMLDivElement;
        const position = getCursorPosition(ev, element);
        if (position < 2 || position >= element.offsetWidth - 2) {
            setIsHovering(false);

            setCursorPosition(0);
            return
        };
        setIsHovering(true);
        setCursorPosition(position);
        setItemId(id);
    }

    /**
     * Changes the state when cursor leaves the item
     */
    const onScissorLeave = () => {
        setIsHovering(false);
        setCursorPosition(0);
        setItemId(null);

    };

    const deselectScissor = () => {
        onScissorLeave();
    }

    return (
        <ScissorContext.Provider value={{
            cropElement,
            cursorPosition,
            isHovering,
            itemId,
            onScissorLeave,
            onScissorOver,
        }}>
            {children}
        </ScissorContext.Provider>
    )
}

/**
 * Custom to hook
 * Used to consume the context
 * @returns the context value
 */
export const useScissorContext = () => React.useContext(ScissorContext);
