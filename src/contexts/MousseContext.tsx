import React from 'react'

interface MousseState {
    /**
     * cursor style
     * @example cursor="point"
     */
    cursor: string,

    /**
     * React Function to update state and set a cursor style
     */
    setCursor: React.Dispatch<React.SetStateAction<string>>

}

const MousseContext = React.createContext<MousseState>({
    cursor: 'default',
    setCursor: () => { }
});

export const MousseProvider: React.FC = ({ children }) => {
    const [cursor, setCursor] = React.useState('default');
    const value = React.useMemo(() => ({cursor, setCursor}), [cursor]);
    return (
        <MousseContext.Provider value={value}>
            {children}
        </MousseContext.Provider>
    )
}

export const useMousseContext = () => React.useContext(MousseContext);