import { useState } from 'react'
import {
  ResetPasswordCodePin,
  ResetPasswordPage,
  ResetPasswordValidation,
} from '../../components/ResetPassword'

const ResetPassword = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState('')
  const changeEmail = (newEmail) => setEmail(newEmail)
  const [code, setCode] = useState('')
  const changeCode = (newCode) => setCode(newCode)
  const advance = () => setCurrentStep((current) => current + 1)

  return (
    <div>
      {currentStep === 1 && (
        <ResetPasswordPage advance={advance} changeEmail={changeEmail} />
      )}
      {currentStep === 2 && (
        <ResetPasswordCodePin
          advance={advance}
          email={email}
          changeCode={changeCode}
        />
      )}
      {currentStep === 3 && (
        <ResetPasswordValidation email={email} code={code} />
      )}
    </div>
  )
}

export default ResetPassword
