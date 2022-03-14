import { Menu, MenuButton, MenuList, MenuItem, Button, Divider } from '@chakra-ui/react'
import Icons from '@/components/Icons'
import Auth from './Auth'
import { useDisclosure } from '@chakra-ui/hooks'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/slices/auth/selectors'
import { Link } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

function File() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector(selectUser)
  return (
    <>
      <Auth isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Menu>
        <MenuButton
          as={Button}
          aria-label="Options"
          icon={<Icons.Bold size={24} />}
          variant="ghost"
          sx={{ color: '#7D7D7D', fontWeight: 400 }}
          _hover={{
            backgroundColor: 'rgba(0,0,0,0)',
            color: '#3782F7',
          }}
          _active={{ backgroundColor: 'rgba(0,0,0,0)', color: '#3782F7' }}
        >
          File
        </MenuButton>
        <MenuList
          sx={{
            padding: '1rem',
            width: '280px',
            border: '1px solid rgba(0,0,0,0.16)',
          }}
        >
          {!user ? (
            <MenuItem
              onClick={onOpen}
              sx={{
                ':hover': { backgroundColor: 'rgba(0,0,0,0)', color: '#3782F7' },
                backgroundColor: 'rgba(0,0,0,0)',
              }}
              py="0.75rem"
              icon={<Icons.Signin size={24} />}
            >
              Sign In
            </MenuItem>
          ) : (
            <MenuItem
              sx={{
                ':hover': { backgroundColor: 'rgba(0,0,0,0)', color: '#3782F7' },
                backgroundColor: 'rgba(0,0,0,0)',
              }}
              py="0.75rem"
            >
              {user.email}
            </MenuItem>
          )}
          <Divider />
          <Link to={`/${nanoid()}`}>
            <MenuItem
              sx={{ ':hover': { backgroundColor: 'rgba(0,0,0,0)', color: '#3782F7' } }}
              py="0.75rem"
              icon={<Icons.Create size={24} />}
            >
              Create new design
            </MenuItem>
          </Link>
          <MenuItem
            sx={{ ':hover': { backgroundColor: 'rgba(0,0,0,0)', color: '#3782F7' } }}
            py="0.75rem"
            icon={<Icons.Duplicate size={24} />}
          >
            make a copy
          </MenuItem>
          <MenuItem
            sx={{ ':hover': { backgroundColor: 'rgba(0,0,0,0)', color: '#3782F7' } }}
            py="0.75rem"
            icon={<Icons.Download size={24} />}
          >
            download
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default File
