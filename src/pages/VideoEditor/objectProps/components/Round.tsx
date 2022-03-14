import React from 'react';
import { Box, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import Icons from '@/components/Icons';
import { useEditor, useEditorContext } from '@/sdk';

type SquareOptions = { topRight: number, topLeft: number, bottomRight: number, bottomLeft: number }
type SquareOptionsInputValues = { topRight: string, topLeft: string, bottomRight: string, bottomLeft: string }

export default function Round() {

    const [options, setOptions] = React.useState({ topRight: '', topLeft: '', bottomRight: '', bottomLeft: '' });
    const isFirstRender = React.useRef(true);

    const editor = useEditor();
    const { activeObject } = useEditorContext()

    const onChange = (ev) => {
        const value = ev.target.value;
        const key = ev.target.name;
        if (value) {
            changeImageAttribute(parseToNumber({ ...options, [key]: value }));
            setOptions({ ...options, [key]: value });
        } else {
            changeImageAttribute(parseToNumber({ ...options, [key]: '0' }));
            setOptions({ ...options, [key]: '' });
        }
    }

    const changeImageAttribute = (options: SquareOptions) => {
        editor.objects.setRoundedCorners(
            Number(options.topLeft),
            Number(options.topRight),
            Number(options.bottomRight),
            Number(options.bottomLeft)
        )
    }

    const parseToNumber = (options: SquareOptionsInputValues) => {
        let newOptions: SquareOptions = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };
        for (let option in options) {
            newOptions[option] = Number(options[option]);
        }

        return newOptions
    }

    const parseToString = (options: SquareOptions) => {
        let newOptions: SquareOptionsInputValues = { topLeft: '', topRight: '', bottomLeft: '', bottomRight: '' };
        for (let option in options) {
            newOptions[option] = String(options[option]);
        }
        return newOptions
    }

    React.useEffect(() => {
        if (activeObject && isFirstRender.current) {

            //@ts-ignore
            if(activeObject?.metadata?.radius) {
                //@ts-ignore
                setOptions(parseToString(activeObject.metadata.radius));
            }
        }
    }, [activeObject])

    return (
        <Box sx={{ padding: '1.5rem' }}>
            <Flex>
                <Box sx={{ fontSize: '14px', color: '#7D7D7D' }}>
                    round
                </Box>

                <Box sx={{ padding: '0 1.5rem 1.5rem 3rem' }}>
                    <Flex>
                        <InputGroup size="xs" w="90px">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icons.TopLeftRound size={10} />
                                }
                            />
                            <Input
                                type='number'
                                placeholder='0'
                                size='xs'
                                color="#000000"
                                fontSize="11px"
                                textAlign="center"
                                paddingRight="20px"
                                onChange={onChange}
                                value={options.topLeft}
                                name="topLeft"
                            />
                        </InputGroup>

                        <InputGroup size="xs" w="90px" ml="2rem">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icons.TopRightRound size={10} />
                                }
                            />
                            <Input
                                type='number'
                                placeholder='0'
                                size='xs'
                                color="#000000"
                                fontSize="11px"
                                textAlign="center"
                                paddingRight="20px"
                                onChange={onChange}
                                value={options.topRight}
                                name="topRight"
                            />
                        </InputGroup>
                    </Flex>

                    <Flex marginTop="0.75rem">
                        <InputGroup size="xs" w="90px">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icons.BottomLeftRound size={10} />
                                }
                            />
                            <Input
                                type='number'
                                placeholder='0'
                                size='xs'
                                color="#000000"
                                fontSize="11px"
                                textAlign="center"
                                paddingRight="20px"
                                onChange={onChange}
                                value={options.bottomLeft}
                                name="bottomLeft"
                            />
                        </InputGroup>

                        <InputGroup size="xs" w="90px" ml="2rem">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icons.BottomRightRound size={10} />
                                }
                            />
                            <Input
                                type='number'
                                placeholder='0'
                                size='xs'
                                color="#000000"
                                fontSize="11px"
                                textAlign="center"
                                paddingRight="20px"
                                onChange={onChange}
                                value={options.bottomRight}
                                name="bottomRight"
                            />
                        </InputGroup>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}
