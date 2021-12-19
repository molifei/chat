import {useParams, useLocation} from 'react-router-dom'
import {getURL} from '@/utils/tools'

function WorkDetail() {

  let params = useParams()
  let location = useLocation()

  console.log(location)

  return (
    <div>
      {params.id}
    </div>
  )
}

export default WorkDetail
