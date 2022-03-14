import { Popover, PopoverTrigger, PopoverContent, Box } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useEditor } from '@sdk'
import Icons from '@/components/Icons'

function Position() {
  const editor = useEditor()
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button color="#636363" size="sm" style={{ fontWeight: 400 }} variant="ghost">
          Order
        </Button>
      </PopoverTrigger>
      <PopoverContent sx={{ width: '280px' }}>
        <div>
          <div
            style={{
              background: '#ffffff',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              padding: '1.5rem',
              fontSize: '14px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <PositionItem
                onClick={editor.objects.bringForward}
                icon="Forward"
                label="Forward"
                shortcut="Ctrl + J"
              />
              <PositionItem
                onClick={editor.objects.bringToFront}
                icon="ToFront"
                label="ToFront"
                shortcut="Ctrl + Alt + J"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <PositionItem
                onClick={editor.objects.sendBackwards}
                icon="Backward"
                label="Backward"
                shortcut="Ctrl + ["
              />
              <PositionItem
                onClick={editor.objects.sendToBack}
                icon="ToBack"
                label="ToBack"
                shortcut="Ctrl + Alt + ["
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface PositionItemProps {
  icon: string
  label: string
  shortcut: string
  onClick: Function
}
const PositionItem = ({ icon, label, onClick }: PositionItemProps) => {
  const Icon = Icons[icon as 'ArrowDown']
  return (
    <Box
      onClick={() => onClick()}
      sx={{
        color: '#636363',
        display: 'flex',
        alignItems: 'center',
        padding: '0.25rem 0.5rem',
        cursor: 'pointer',
        borderRadius: '4px',
        ':hover': { backgroundColor: '#EDEDED' },
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Icon size={24} />
        <div style={{ paddingLeft: '0.5rem', color: 'rgba(37,40,47,0.65)' }}>{label}</div>
      </div>
    </Box>
  )
}

export default Position
