import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import AppRoutes from './Routes'
import Container from './Container'
import Providers from './Providers'

import 'focus-visible'
import { MousseProvider } from './contexts/MousseContext'

ReactDOM.render(
  <Providers>
    <Container>
      <MousseProvider>
        <AppRoutes />
      </MousseProvider>
    </Container>
  </Providers>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
