import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react';

type DialogModalProps = {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    buttonLable?: string;
    isCentered?: boolean
}

export default function DialogModal({ title, description, isOpen, onClose, buttonLable = 'OK', isCentered = true }: DialogModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader textAlign="center" fontWeight="bold" fontSize="24px">
                    {title}
                </ModalHeader>

                <ModalBody>
                    <Flex direction="column" align="center">
                        <Text fontSize="14px" fontWeight="normal">{description}</Text>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button
                        height="50px"
                        w="100%"
                        backgroundColor="#3782F7"
                        color="white"
                        fontSize="15px"
                        // mt="36px"
                        borderRadius="12px"
                        onClick={onClose}
                    >
                        {buttonLable}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
