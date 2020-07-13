import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createCookie, getErrorMessage } from '../../utils/helpers';
import { TOKEN_KEY } from '../../constants/GlobalConstants';

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginStaff.scss';

const propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const defaultProps = {};

const LoginStaff = ({ login, history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    try {
      setLoading(true);
      const { email, password } = values;
      const { token } = await login('/staffs/login', {
        username: email,
        password
      });
      createCookie(TOKEN_KEY, token);
      history.push('/a2hl-management');
    } catch (err) {
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="public-form">
      <div className="public-form__wrap" style={{ width: '400px' }}>
        <h2 className="public-form__header">A2HL Management</h2>
        <Form name="form" className="form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Email không được bỏ trống!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Mật khẩu không được bỏ trống!' }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

LoginStaff.propTypes = propTypes;
LoginStaff.defaultProps = defaultProps;

export default LoginStaff;