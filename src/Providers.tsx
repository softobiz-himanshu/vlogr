import { FC } from 'react'
import store, { persistor } from '@store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { DesignEditorProvider } from './contexts/DesignEditorContext'
import { EditorProvider } from '@sdk'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { theme } from './theme'
const extendedTheme = extendTheme(theme)

const Providers: FC = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={<div>HEllo</div>} persistor={persistor}>
      <ChakraProvider theme={extendedTheme}>
        <DesignEditorProvider>
          <EditorProvider>{children}</EditorProvider>
        </DesignEditorProvider>
      </ChakraProvider>
    </PersistGate>
  </Provider>
)

export default Providers
