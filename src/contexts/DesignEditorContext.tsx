import { PanelType } from '@/constants/app-options'
import { ObjectPropsType } from '@/constants/editor'
import { createContext, useState, FC } from 'react'

type Template = any

interface IDesignEditorContext {
  /**
   * Canvas template
   */
  templates: Template[]
  setTemplates: (templates: Template[]) => void

  /**
   * Fabric shapes
   */
  shapes: any[]
  setShapes: (templates: any[]) => void

  /**
   * Active panel (Elements, Images, Audios, Text)
   */
  activePanel: PanelType
  setActivePanel: (option: any) => void

  /**
   * Fabric Object type
   */
  activeObjectProps: ObjectPropsType | null
  setActiveObjectProps: (option: any) => void
}

export const DesignEditorContext = createContext<IDesignEditorContext>({
  templates: [],
  setTemplates: () => {},
  shapes: [],
  setShapes: () => {},
  activePanel: PanelType.TEMPLATES,
  setActivePanel: () => {},
  activeObjectProps: null,
  setActiveObjectProps: (value: ObjectPropsType) => {},
})

export const DesignEditorProvider: FC = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [shapes, setShapes] = useState<Template[]>([])
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.TEMPLATES)
  const [activeObjectProps, setActiveObjectProps] = useState<any>(null)

  const context = {
    templates,
    setTemplates,
    activePanel,
    setActivePanel,
    shapes,
    setShapes,
    activeObjectProps,
    setActiveObjectProps,
  }
  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>
}
