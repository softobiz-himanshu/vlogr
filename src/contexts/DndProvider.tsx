import { LineType } from '@/constants/lineType';
import { ClipItem } from '@/interfaces/ClipItem';
import { Item } from '@/interfaces/Item';
import React from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

/**
 * DnD State
 */
interface DragState {
    /**
     * Delta X and Y Position
     */
    deltaPosition: {
        x: number;
        y: number;
    },

    /**
     * Controlled item position
     */
    position: { x: number, y: number },

    /**
     * Diference between previous position and current position
     */
    positionDiference: number;

    /**
     * Dragged item
     */
    selectedItem: Item | ClipItem | null;

    /**
     * Whether the item is being dragged
     */
    isDragging: boolean,

    /**
     * Cursor position relative to HTML item
     */
    cursorPosition: number,

    /**
     * Whether the dragged item is a clip
     */
    isClip: boolean,

    /**
     * Flag used that allows to displace the next clip
     */
    allowDisplacement: boolean,

    /**
     * Flag used to know if the element is the item is stuck to the magnetic guide from the tails or the head
     */
    stuckSide?: 'head' | 'tail',

    /**
     * Mousse clientX
     */
    clientX: number;
}

const initialState: DragState = {
    deltaPosition: {
        x: 0, y: 0
    },
    position: { x: 0, y: 0 },
    positionDiference: 0,
    selectedItem: null,
    isDragging: false,
    cursorPosition: 0,
    isClip: false,
    allowDisplacement: false,
    stuckSide: null,
    clientX: 0
}

interface DnDProviderValue {
    /**
     * DragState
     */
    dragState: DragState,

    /**
     * React Function that changes the state
     */
    setDragState: React.Dispatch<React.SetStateAction<DragState>>,

    /**
     * Callback function to initialize the dragging process
     */
    onStart: (ev?: DraggableEvent, ui?: DraggableData, item?: Item | ClipItem) => void,

    /**
     * Callback function to finish the dragging process
     */
    onStop: (ev?: DraggableEvent, ui?: DraggableData, callback?: Function) => void,

    /**
     * Callback function to perform operations when the item is being dragged
     */
    onDrag: (ev?: DraggableEvent, ui?: DraggableData) => void,

    /**
     * Function to change the position of the item
     */
    setPosition: (x: number, y: number, diference: number, stuckSide: 'head' | 'tail') => void,

    /**
     * Changes state to initial state
     */
    restartState: () => void
}

const DndContext = React.createContext<DnDProviderValue>({
    dragState: initialState,
    setDragState: () => { },
    onStart: () => { },
    onStop: () => { },
    onDrag: () => { },
    setPosition: () => { },
    restartState: () => { }
});


export const DndProvider: React.FC = ({ children }) => {

    const [dragState, setDragState] = React.useState<DragState>(initialState);

    const setPosition = (x: number, y: number, diference: number, stuckSide: 'head' | 'tail') => {
        setDragState({ ...dragState, position: { x, y }, positionDiference: diference, stuckSide });
    }

    const onStart = (
        ev?: DraggableEvent,
        ui?: DraggableData,
        item?: Item | ClipItem,
    ) => {
        if (dragState.isDragging) return;
        const cursorPosition = getCursorPosition(ev, ui);
        if (item) {
            setDragState(prev => ({
                ...prev,
                selectedItem: item,
                isDragging: true,
                cursorPosition,
                isClip: item?.type === 'clip',
                allowDisplacement: true
            }))
        }
    }


    const onStop = (ev?: DraggableEvent, ui?: DraggableData, callback?: Function) => {

        setDragState({ ...dragState, allowDisplacement: false })

        if (callback && dragState.deltaPosition.x !== 0) {
            callback();
        }

        if (dragState.selectedItem) {
            restartState();
        }
    }

    const onDrag = (ev?: DraggableEvent, ui?: DraggableData) => {

        const cursorPosition = getCursorPosition(ev, ui);

        const { x, y } = dragState.deltaPosition;
        setDragState({
            ...dragState,
            deltaPosition: {
                x: x + (ui?.deltaX || 0),
                y: y + (ui?.deltaY || 0),
            },
            cursorPosition,
            clientX: (ev as React.MouseEvent).clientX
        })
    }

    const getCursorPosition = (ev?: DraggableEvent, ui?: DraggableData) => {
        if (ev && ui) {
            const clientX = (ev as any).clientX;
            return clientX - (ui?.node.getBoundingClientRect().x || 0);
        }
        return dragState.cursorPosition
    }

    const restartState = () => setDragState({
        ...dragState,
        deltaPosition: {
            x: 0, y: 0
        },
        selectedItem: null,
        isDragging: false,
        cursorPosition: 0,
        isClip: false,
        positionDiference: 0,
        position: { x: 0, y: 0 },
        clientX: 0
    })

    return (
        <DndContext.Provider value={{ dragState, setDragState, onStart, onStop, onDrag, setPosition, restartState }}>
            {children}
        </DndContext.Provider>
    )
}

export const useDndProvider = () => React.useContext(DndContext);