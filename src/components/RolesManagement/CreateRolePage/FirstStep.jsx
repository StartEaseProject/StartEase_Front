import Description from './Description'
import { Button } from '../../Globals'

const FirstStep = ({ advance }) => {
  return (
    <div className='px-layout'>
      <Description
        title='create role'
        description="This form constitutes of three steps. The first one (here) 
                is just a small description. In the second, you will provide a name for the role. In th third
                you will select the role's permission"
      />
      <Button className='mt-7' onClick={advance}>
        Start
      </Button>
    </div>
  )
}

export default FirstStep
