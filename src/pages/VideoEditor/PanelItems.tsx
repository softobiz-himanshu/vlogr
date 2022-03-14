import { Box } from '@chakra-ui/react'
import { panelListItems } from '@constants/editor'
import Icons from '@/components/Icons'
import useDesignEditorContext from '@/hooks/useDesignEditorContext'
import { useEditor } from '@sdk'

function PanelItems() {
  const { activePanel, setActivePanel } = useDesignEditorContext()
  const editor = useEditor()

  return (
    <Box
      sx={{
        background: '#ffffff',
        width: '70px',
        height: '100%',
        padding: '1rem 0',
        borderRight: '1px solid rgba(37,40,47,0.1)',
      }}
      id="panelItemsWrapper"
    >
      {panelListItems.map(panelListItem => {
        const Icon = Icons[panelListItem.name as 'Elements']
        const isActive = panelListItem.name === activePanel
        return (
          <Box
            key={panelListItem.id}
            onClick={() => {
              editor.objects.deselect()
              editor.objects.deselectActiveObject()
              setActivePanel(panelListItem.name)
            }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              fontSize: '0.85rem',
              color: isActive ? 'rgb(55,130, 247)' : '#9d9ea3',
              background: isActive ? 'rgba(55,130, 247, 0.1)' : '#ffffff',
              gap: '0.25rem',
              padding: '0.75rem 0',
              ':hover': {
                color: 'rgb(55,130, 247)',
                cursor: 'pointer',
              },
              alignItems: "center"
            }}
          >
            <Icon size={24} />
            <Box>{panelListItem.label}</Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default PanelItems
