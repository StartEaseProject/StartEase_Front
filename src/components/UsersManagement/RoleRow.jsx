import { useState } from 'react'
import { ToggleSwitch } from '../Globals'

const RoleRow = ({
  role,
  addRole,
  removeRole,
  isSelected,
}) => {
  const [selected, setSelected] = useState(isSelected)
  const toggleSelected = () => {
    if (selected) removeRole(role.id)
    else addRole(role.id)
    setSelected((selec) => !selec)
  }
  return (
    <li className='pl-[30px] pr-16 hover:bg-bgColor flex justify-between items-center py-3'>
      <span className='capitalize text-secondaryColor text-fs-300'>
        {role.name}
      </span>
      <span onClick={toggleSelected}>
        <ToggleSwitch ison={selected} />
      </span>
    </li>
  )
}

export default RoleRow
