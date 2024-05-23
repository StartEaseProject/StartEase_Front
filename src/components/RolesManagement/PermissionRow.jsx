import { useState } from 'react'
import { ToggleSwitch } from '../Globals'

const PermissionRow = ({
  perm,
  modifiable,
  addPermission,
  removePermission,
  isSelected,
}) => {
  const [selected, setSelected] = useState(isSelected)
  const toggleSelected = () => {
    if (selected) removePermission(perm.id)
    else addPermission(perm.id)
    setSelected((selec) => !selec)
  }
  return (
    <li className='pl-[30px] pr-16 hover:bg-bgColor flex justify-between items-center py-3'>
      <span className='capitalize text-secondaryColor text-fs-300'>
        {perm.name}
      </span>
      {modifiable&& <span onClick={toggleSelected}>
        <ToggleSwitch ison={selected} />
      </span>}
    </li>
  )
}

export default PermissionRow
