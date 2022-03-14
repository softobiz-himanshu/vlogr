import { Popover, PopoverTrigger, PopoverContent, Button } from '@chakra-ui/react'
import { useEditor } from '@sdk'
import Icons from '@/components/Icons'
import { useState } from 'react'

function Flip() {
  const editor = useEditor()
  const [options, setOptions] = useState({
    flipX: false,
    flipY: false,
  })
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button color="#636363" size="sm" style={{ fontWeight: 400 }} variant="ghost">
          Flip
        </Button>
      </PopoverTrigger>
      <PopoverContent sx={{ width: '280px' }}>
        <div>
          <div
            style={{
              background: '#ffffff',
              display: 'grid',
              gap: '1rem',
              padding: '1rem',
              fontSize: '14px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <PositionItem
                onClick={() => {
                  editor.objects.update({ flipX: !options.flipX })
                  setOptions({ ...options, flipX: !options.flipX })
                }}
                icon="FlipX"
                label="Flip horizontal"
                shortcut="Ctrl + J"
              />
              <PositionItem
                onClick={() => {
                  editor.objects.update({ flipY: !options.flipY })
                  setOptions({ ...options, flipY: !options.flipY })
                }}
                icon="FlipY"
                label="Flip vertical"
                shortcut="Ctrl + Alt + J"
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
    <div onClick={() => onClick()} style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Icon size={24} />
        <div style={{ paddingLeft: '0.5rem', color: 'rgba(37,40,47,0.65)' }}>{label}</div>
      </div>
    </div>
  )
}

export default Flip
