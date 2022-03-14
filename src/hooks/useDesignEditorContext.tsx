import { DesignEditorContext } from '@/contexts/DesignEditorContext'
import { useContext } from 'react'

function useDesignEditorContext() {
  const {
    activePanel,
    setActivePanel,
    templates,
    setTemplates,
    shapes,
    setShapes,
    activeObjectProps,
    setActiveObjectProps,
  } = useContext(DesignEditorContext)
  return {
    activePanel,
    setActivePanel,
    templates,
    setTemplates,
    shapes,
    setShapes,
    activeObjectProps,
    setActiveObjectProps,
  }
}

export default useDesignEditorContext
