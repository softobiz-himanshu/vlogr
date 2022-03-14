import { useEffect, useState } from 'react'
import { Box, Checkbox } from '@chakra-ui/react'
import throttle from 'lodash/throttle'
import ColorPicker from '@components/ColorPicker'
import { useActiveObject, useEditor } from '@sdk'


function Stroke() {
    const [stroke, setStroke] = useState('')
    const activeObject = useActiveObject()
    const editor = useEditor()

    useEffect(() => {
        if (activeObject) {
            updateOptions(activeObject)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeObject])

    const updateOptions = (object: any) => {
        const { stroke } = object
        setStroke(stroke);
    }

    const updateStrokeColor = throttle((color: string) => {
        if (editor) {
            setStroke(color)
            editor.objects.update({
                stroke: color,
                strokeWidth: 1
            })
        }
    }, 200)

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem' }}>
            <Box
                sx={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr 40px',
                }}
            >

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '30px 1fr',
                    width: '100%',
                }} align="center">
                    <Checkbox isChecked={true} mr="10px" />
                    <Box
                        flex="1"
                        textAlign="left"
                        sx={{ color: '#7D7D7D', fontSize: '14px', padding: '0.5rem 0' }}
                    >
                        Stroke
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ColorPicker onChange={updateStrokeColor} value={stroke} />
                </Box>
            </Box>
        </Box>
    )
}

export default Stroke
