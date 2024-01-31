'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, message } from 'antd';
import { ThemeContent, Form } from '@/components';
import { fetchData } from '@/hooks/useFetch';
import { saveToken, saveUserInfo } from '../action';
import styles from './styles.module.scss';

const fields: any[] = [
  {
    type: 'input',
    label: '用户名',
    name: 'username',
    rules: [{ required: true, message: '请输入您的用户名!' }],
  },
  {
    type: 'password',
    label: '密码',
    name: 'password',
    rules: [{ required: true, message: '请输入您的密码!' }],
  },
];

const Login = () => {
  const router = useRouter();

  const formRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      await formRef?.current?.validateFields();
      const _values = formRef?.current?.getFieldsValue();
      setLoading(true);
      const { data } = await fetchData({
        url: '/auth/login',
        method: 'post',
        params: _values,
      });

      if (data) {
        const { token, userInfo } = data;
        saveToken(token);
        saveUserInfo(userInfo);
        message.success('登录成功！');
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <ThemeContent>
      <div className={styles.login}>
        <div className={styles.loginBox}>
          <h4 className={styles.title}>您好，这是NextJS 13 试验项目，请登录!</h4>
          <Form labelCol={{ span: 6 }} requiredMark={false} ref={formRef} fields={fields} />
          <Button loading={loading} type="primary" block onClick={handleSubmit}>
            登录
          </Button>
          <div className={styles.footer}>
            <Button
              block
              onClick={() => {
                // signIn('github');
              }}
            >
              Login With Github【暂不开放】
            </Button>
          </div>
          <div className={styles.linkBox}>
            <Link className={styles.link} href="/">
              首页
            </Link>
            <Link className={styles.link} href="/register">
              注册
            </Link>
          </div>
        </div>
      </div>
    </ThemeContent>
  );
};

export default Login;
