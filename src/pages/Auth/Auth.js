import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Row, Typography, Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { useUserContext } from '../../context/userContext';
import './Auth.css'

const { Title } = Typography;

export const AuthPage = () => {
  const { onLogin } = useUserContext();

  const onSubmit = async (values) => {
    try {
      await onLogin(values)
    } catch (err) {
      toast.error(err?.data?.message || 'Une erreur est survenue !');
    }
  };

  return (
    <div className="auth-page-wrapper">
        <Row>
            <Title level={1}>FitnessLife</Title>
        </Row>
        <Form name="auth" onFinish={onSubmit} layout="vertical" className="auth-form">
            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    message: 'Entrez votre email !',
                    required: true,
                    type: 'email',
                },
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                label="Mot de passe"
                name="password"
                rules={[
                {
                    message: 'Entrez votre mot de passe !',
                    required: true,
                },
                ]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Mot de passe" />
            </Form.Item>
            <Form.Item>
                <Button loading={false} type="primary" htmlType="submit" className="login-button">
                Connexion
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
};
