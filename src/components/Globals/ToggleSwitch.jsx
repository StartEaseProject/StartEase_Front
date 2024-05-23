import { useState } from 'react'
import Icon from './Icon'

const ToggleSwitch = ({ ison }) => {
  const [on, setOn] = useState(ison)

  const handleToggle = () => {
    setOn(!on)
  }

  return (
    <div
      className={` ${
        on
          ? 'bg-primaryColor toggle-switch relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300'
          : 'toggle-switch relative w-16 h-8 rounded-full bg-thirdColor cursor-pointer transition-colors duration-300'
      }`}
      onClick={handleToggle}
    >
      <div
        className={`toggle-switch-slider absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
          on && 'transform translate-x-8 '
        }`}
      >
        <Icon
          icon={on ? 'done' : 'close'}
          className={`shrink-0 group-focus-within:stroke-primaryColor transition-all object-fill ${
            on ? 'stroke-primaryColor' : 'stroke-thirdColor '
          }`}
        />
      </div>
    </div>
  )
}
export default ToggleSwitch
