import { Popover, PopoverTrigger, PopoverContent, Button, Box } from '@chakra-ui/react'
import { useEditor } from '@sdk'
import Icons from '@/components/Icons'

function Alignment() {
  const editor = useEditor()
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button color="#636363" size="sm" style={{ fontWeight: 400 }} variant="ghost">
          Align
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
                onClick={editor.objects.alignTop}
                icon="AlignToPageTop"
                label="Top"
                shortcut="Ctrl + J"
              />
              <PositionItem
                onClick={editor.objects.alignMiddle}
                icon="AlignToPageMiddle"
                label="Middle"
                shortcut="Ctrl + J"
              />
              <PositionItem
                onClick={editor.objects.alignBottom}
                icon="AlignToPageBottom"
                label="Bottom"
                shortcut="Ctrl + Alt + J"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <PositionItem
                onClick={editor.objects.alignLeft}
                icon="AlignToPageLeft"
                label="Left"
                shortcut="Ctrl + ["
              />
              <PositionItem
                onClick={editor.objects.alignCenter}
                icon="AlignToPageCenter"
                label="Center"
                shortcut="Ctrl + Alt + ["
              />
              <PositionItem
                onClick={editor.objects.alignRight}
                icon="AlignToPageRight"
                label="Right"
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

export default Alignment
