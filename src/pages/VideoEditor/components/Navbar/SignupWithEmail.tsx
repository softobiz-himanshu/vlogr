import { useCallback, useState } from 'react'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import Icons from '@components/Icons'
import { useAppDispatch } from '@/store/store'
import { signup } from '@/store/slices/auth/actions'

interface Options {
  name: string
  email: string
  password: string
}

interface Props {
  handleSignin: any
  setWithEmail: any
  onClose: () => void
}
function SignupWithEmail({ setWithEmail, onClose }: Props) {
  const [options, setOptions] = useState<Options>({ email: '', password: '', name: '' })
  const dispath = useAppDispatch()
  const handleSignup = useCallback(() => {
    dispath(signup(options)).then(() => {
      onClose()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  return (
    <Box sx={{ padding: '1rem 1.5rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '1.5rem', gap: '1rem' }}>
        <Box onClick={() => setWithEmail(false)}>
          <Icons.ChevronLeft size={20} />
        </Box>

        <Text sx={{ fontWeight: 700, fontSize: '1.25rem' }}>Create your account</Text>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          onChange={e => setOptions({ ...options, name: e.target.value })}
          value={options.name}
          sx={{ fontSize: '14px', height: '48px', borderRadius: '12px' }}
          placeholder="Name"
        />
        <Input
          onChange={e => setOptions({ ...options, email: e.target.value })}
          value={options.email}
          sx={{ fontSize: '14px', height: '48px', borderRadius: '12px' }}
          placeholder="Email"
        />
        <Input
          onChange={e => setOptions({ ...options, password: e.target.value })}
          value={options.password}
          type="password"
          sx={{ fontSize: '14px', height: '48px', borderRadius: '12px' }}
          placeholder="Password"
        />
        <Text sx={{ color: '#7D7D7D' }}>Use 8 or more characters with mix of letter, numbers & simbols</Text>
        <Button
          onClick={() => handleSignup()}
          sx={{ fontSize: '14px', height: '48px', borderRadius: '12px' }}
        >
          Get started, it's free!
        </Button>
      </Box>

      <Box sx={{ paddingTop: '0.5rem' }}>
        <Text sx={{ color: '#7D7D7D' }}>
          By continuing, you agree to Canva’s Team of Use. Read our Privacy Policy.
        </Text>
      </Box>
      <Box sx={{ display: 'flex', padding: '1rem 0', flexDirection: 'column', gap: '0.5rem' }}>
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          Already signed up?
          <Text onClick={() => {}} sx={{ color: 'blue' }}>
            Log in
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default SignupWithEmail
