import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'
import { useState } from 'react'
import Signin from './Signin'
import Signup from './Signup'

interface SigninProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
function Auth({ isOpen, onClose }: SigninProps) {
  const [view, setView] = useState('signin')
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent sx={{ maxWidth: '400px', padding: '0.5rem' }}>
          {view === 'signin' ? (
            <Signin setView={setView} onClose={onClose} />
          ) : (
            <Signup setView={setView} onClose={onClose} />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Auth
