import LoadableComponent from '@loadable/component'

let Loadable = (c) => {
  console.log(c)
  LoadableComponent(c)
}

export default Loadable
