import { signin } from '@/store/slices/auth/actions'
import { useAppDispatch } from '@/store/store'
import { useCallback, useState } from 'react'
import SignupWithEmail from './SignupWithEmail'
import SignupWithoutEmail from './SignupWithoutEmail'

interface Options {
  email: string
  password: string
}
interface SigninProps {
  onClose: () => void
  setView: (option: string) => void
}
function Signin({ onClose, setView }: SigninProps) {
  const [withEmail, setWithEmail] = useState(false)
  const [options] = useState<Options>({ email: '', password: '' })
  const dispath = useAppDispatch()
  const handleSignin = useCallback(() => {
    dispath(signin(options)).then(() => {
      onClose()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  return (
    <>
      {withEmail ? (
        <SignupWithEmail onClose={onClose} setWithEmail={setWithEmail} handleSignin={handleSignin} />
      ) : (
        <SignupWithoutEmail setView={setView} setWithEmail={setWithEmail} handleSignin={handleSignin} />
      )}
    </>
  )
}

export default Signin
