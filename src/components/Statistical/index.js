import {useContext} from 'react'
import './index.less'
import context from '@/context';

function Statistical() {
  const {list} = useContext(context)
  console.log(list)

  return (
    <ul className='statistical-wrap'>
      {list.map(item => <li key={item.title}>{item.title}</li>)}
    </ul>
  )
}

export default Statistical
