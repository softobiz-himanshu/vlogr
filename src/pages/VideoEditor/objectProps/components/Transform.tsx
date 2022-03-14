import React from 'react';
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import Icons from '@/components/Icons';
import { useEditor, useEditorContext } from '@/sdk';

export default function Transform() {

    const [options, setOptions] = React.useState({ left: '', top: '', width: '', height: '', rotation: '', skew: '' });
    const { activeObject } = useEditorContext()

    const editor = useEditor();

    const onChange = (ev) => {
        const value = ev.target.value;
        const key = ev.target.name;
        let attributeValue = 0
        if (value) {
            attributeValue = parseInt(ev.target.value);
            changeImageAttribute(key, attributeValue);
            setOptions({ ...options, [key]: value });
        } else {
            changeImageAttribute(key, attributeValue);
            setOptions({ ...options, [key]: '' });
        }
    }

    const changeImageAttribute = (key: string, value: number) => {
        const attributes = {
            left: () => editor.objects.setLeftPosition(value),
            top: () => editor.objects.setTopPosition(value),
            width: () => editor.objects.setWidth(value),
            height: () => editor.objects.setHeight(value),
            rotation: () => editor.objects.rotate(value),
            skew: () => editor.objects.setSkew(value)
        }

        attributes[key]();
    }

    const fitCanvas = () => editor.objects.fitCanvas();
    const fillCanvas = () => editor.objects.fillCanvas();

    React.useEffect(() => {

        if (activeObject) {
            setOptions({
                left: activeObject.left?.toString() || '',
                top: activeObject.top?.toString() || '',
                width: activeObject.getScaledWidth()?.toString() || '',
                height: activeObject.getScaledHeight()?.toString() || '',
                rotation: activeObject.angle?.toString() || '',
                skew: activeObject.skewX?.toString() || ''
            })
        }

    }, [activeObject])

    return (
        <Box sx={{ padding: '1.2rem 1.5rem' }}>
            <Flex>
                <Box sx={{ fontSize: '14px', color: '#7D7D7D' }}>
                    transform
                </Box>

                <Box sx={{ padding: '0 1.5rem 1.5rem' }}>
                    <Flex>
                        <InputGroup size="xs" w="90px">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Text sx={{ fontSize: "12px", color: "#7D7D7D" }} >
                                        X
                                    </Text>
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
                                value={options.left}
                                name="left"
                            />
                        </InputGroup>

                        <InputGroup size="xs" w="90px" ml="2rem">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Text sx={{ fontSize: "12px", color: "#7D7D7D" }} >
                                        Y
                                    </Text>
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
                                value={options.top}
                                name="top"
                            />
                        </InputGroup>
                    </Flex>

                    <Flex marginTop="0.75rem">
                        <InputGroup size="xs" w="90px">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Text sx={{ fontSize: "12px", color: "#7D7D7D" }} >
                                        W
                                    </Text>
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
                                value={options.width}
                                name="width"
                            />
                        </InputGroup>

                        <InputGroup size="xs" w="90px" ml="2rem">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Text sx={{ fontSize: "12px", color: "#7D7D7D" }} >
                                        H
                                    </Text>
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
                                value={options.height}
                                name="height"
                            />
                        </InputGroup>
                    </Flex>

                    <Flex marginTop="0.75rem">
                        <InputGroup size="xs" w="90px">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icons.Triangle size={13} />
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
                                value={options.rotation}
                                name="rotation"
                            />
                        </InputGroup>

                        <InputGroup size="xs" w="90px" ml="2rem">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <Icons.ArrowSquareRight size={14} />
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
                                value={options.skew}
                                name="skew"
                            />
                        </InputGroup>
                    </Flex>
                </Box>
            </Flex>

            <Flex marginTop="1.5rem">
                <Button
                    flex="1"
                    variant="outline"
                    color="#636363"
                    borderColor="#E2E3E4"
                    fontSize="14px"
                    height="35px"
                    borderRadius="4px"
                    onClick={fitCanvas}
                >
                    Fit the canvas
                </Button>
                <Button
                    flex="1"
                    ml="0.625rem"
                    variant="outline"
                    color="#636363"
                    borderColor="#E2E3E4"
                    fontSize="14px"
                    height="35px"
                    borderRadius="4px"
                    onClick={fillCanvas}
                >
                    Fill the canvas
                </Button>
            </Flex>
        </Box>
    )
}
