import {Form, Input, Button, Checkbox, Layout} from 'antd';
import './index.less'
import store from '@/store'
import {getLogin} from '@/store/actionCreators/auth'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react';
import Logo from '@/assets/img/logo.png'

const {Header, Footer, Sider, Content} = Layout;

function Login() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const onFinish = async(values) => {
    setLoading(true)
    const res = await store.dispatch(getLogin(values))
    setLoading(false)
    console.log(res)
    if (res) navigate('/')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="login-wrap">
      <Header className="header">
        <img src={Logo} alt="" />
        <h1>一个聊天室</h1>
      </Header>
      <Content className="content animated bounceInDown">
        <Form
          name="basic"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Username"
            name="account"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}

export default Login;
