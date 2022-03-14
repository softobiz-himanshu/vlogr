import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DesignEditor from '@pages/DesignEditor'
import VideoEditor from '@pages/VideoEditor'
import RedirectManager from '@pages/RedirectManager'
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/redirect" element={<RedirectManager />} />
        <Route path="/video" element={<VideoEditor />} />
        <Route path="/:id" element={<DesignEditor />} />
        <Route path="/" element={<VideoEditor />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
