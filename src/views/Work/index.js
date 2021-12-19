import {useState, useEffect, createContext, useContext, useReducer} from 'react';
import {Button, Tag} from 'antd'
import Statistical from '@c/Statistical'
import context from '@/context';
import {Link, useNavigate} from 'react-router-dom';

const initState = {
  count: 0,
  name: '小明'
}

function reducer(state, action) {
  // console.log(state, action)
  switch (action.type) {
  case 'add':
    return {
      count: state.count + 1,
      name: state.name
    }
  case 'minus':
    return {
      count: state.count - 1,
      name: state.name
    }
  case 'changeName':
    return {
      count: state.count,
      name: '小刚'
    }
  default:
    throw new Error();
  }
}

function Work() {

  let navigate = useNavigate()

  const [state, dispatch] = useReducer(reducer, initState)

  const go2 = (id) => {
    navigate(`/work-detail/${id}/?from=work&to=work2`, {state: {id, a: 7}})
  }

  return (
    <>
      <Tag color="geekblue">{state.name}</Tag>
      <Tag color="geekblue">{state.count}</Tag>
      <br/>
      <Button onClick={() => dispatch({type: 'add'})}>点击+</Button>
      <Button onClick={() => dispatch({type: 'minus'})}>点击-</Button>
      <Button onClick={() => dispatch({type: 'changeName'})}>改名字</Button>
      {/* <context.Provider value={{list, count}} count={count}>*/}
      {/*  <Statistical />*/}
      {/* </context.Provider>*/}

      <Button><Link to='/work-detail/1?a=1&b=2'>go1</Link></Button>
      <Button onClick={() => go2(2)}>go2</Button>
    </>
  )
}

export default Work
