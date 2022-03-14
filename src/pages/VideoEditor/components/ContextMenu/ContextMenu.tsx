import { Box, Divider } from '@chakra-ui/react'
import { useContextMenuRequest, useEditor } from '@sdk'
import Icons from '@/components/Icons'

function ContextMenu() {
  const contextMenuRequest = useContextMenuRequest()
  const editor = useEditor()

  if (!contextMenuRequest || !contextMenuRequest.target) {
    return <></>
  }

  if (contextMenuRequest.target.type === 'Background') {
    return (
      <>
        <Box // @ts-ignore
          onContextMenu={(e: Event) => e.preventDefault()}
          sx={{
            position: 'absolute',
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: '240px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
            padding: '0.5rem 0',
          }}
        >
          <ContextMenuItem
            disabled={true}
            onClick={() => {
              editor.objects.copy()
              editor.cancelContextMenu()
            }}
            icon="Duplicate"
            label="copy"
          />
          <ContextMenuItem
            onClick={() => {
              editor.objects.paste()
              editor.cancelContextMenu()
            }}
            icon="Paste"
            label="paste"
          />
          <ContextMenuItem
            disabled={true}
            onClick={() => {
              editor.objects.remove()
              editor.cancelContextMenu()
            }}
            icon="Delete"
            label="delete"
          />
        </Box>
      </>
    )
  }
  return (
    <>
      {!contextMenuRequest.target.locked ? (
        <Box // @ts-ignore
          onContextMenu={(e: Event) => e.preventDefault()}
          sx={{
            position: 'absolute',
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: '240px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
            padding: '0.5rem 0',
          }}
        >
          <ContextMenuItem
            onClick={() => {
              editor.objects.copy()
              editor.cancelContextMenu()
            }}
            icon="Duplicate"
            label="copy"
          />
          <ContextMenuItem
            onClick={() => {
              editor.objects.paste()
              editor.cancelContextMenu()
            }}
            icon="Paste"
            label="paste"
          />
          <ContextMenuItem
            onClick={() => {
              editor.objects.remove()
              editor.cancelContextMenu()
            }}
            icon="Delete"
            label="delete"
          />
          <Divider sx={{ margin: '0.5rem 0' }} />
          <ContextMenuItem
            onClick={() => {
              editor.objects.bringToFront()
              editor.cancelContextMenu()
            }}
            icon="ToFront"
            label="bring to front"
          />
          <ContextMenuItem
            onClick={() => {
              editor.objects.bringForward()
              editor.cancelContextMenu()
            }}
            icon="Forward"
            label="bring forward"
          />
          <ContextMenuItem
            onClick={() => {
              editor.objects.sendToBack()
              editor.cancelContextMenu()
            }}
            icon="ToBack"
            label="send back"
          />
          <ContextMenuItem
            onClick={() => {
              editor.objects.sendBackwards()
              editor.cancelContextMenu()
            }}
            icon="Backward"
            label="send backward"
          />

          {/* <Divider sx={{ margin: '0.5rem 0' }} />
          <ContextMenuItem
            onClick={() => {
              editor.objects.lock()
              editor.cancelContextMenu()
            }}
            icon="Locked"
            label="lock"
          /> */}
        </Box>
      ) : (
        <Box // @ts-ignore
          onContextMenu={(e: Event) => e.preventDefault()}
          sx={{
            position: 'absolute',
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: '240px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0.5px 2px 7px rgba(0, 0, 0, 0.1)',
            padding: '0.5rem 0',
          }}
        >
          <ContextMenuItem
            onClick={() => {
              editor.objects.unlock()
              editor.cancelContextMenu()
            }}
            icon="Unlocked"
            label="unlock"
          />
        </Box>
      )}
    </>
  )
}

function ContextMenuItem({
  icon,
  label,
  onClick,
  disabled = false,
}: {
  icon: string
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  const Icon = Icons[icon as 'Delete']
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        height: '42px',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '1rem',
        cursor: 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.4 : 1,
        ':hover': {
          backgroundColor: 'rgba(0,0,0,0.075)',
        },
      }}
    >
      <Icon size={24} /> {label}
    </Box>
  )
}

export default ContextMenu
