import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Row, Card, Divider } from "antd";
import { Eye, Mail } from "react-feather";

import Link from "next/link";

import useUser from "../../hooks/useUser";

const FormItem = Form.Item;

const gridStyle = {
  width: "100%",
  textAlign: "center",
};

const Signin = ({ form }) => {
  const { user, signIn, signInEmailAndPassword } = useUser();
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    user && router.replace("/");
  }, [user]);

  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="px-3 bg-white mh-page pageContainerLogin"
      style={{ minHeight: "100vh" }}
    >
      <Card>
        <Card.Grid style={gridStyle}>
          <div className="text-center mb-5">
            <Link href="/signin">
              <h1 className="title">
                <img src="/img/cow_64.png" />
                <br />
                The <a href="#!">Origin</a>
              </h1>
            </Link>
          </div>
          <Divider orientation="left">Login</Divider>
          <Form layout="vertical" form={form}>
            <FormItem
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  types: {
                    email: "${label} is not a valid email!",
                  },
                },
              ]}
            >
              <Input
                prefix={
                  <Mail
                    size={16}
                    strokeWidth={1}
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                onChange={({ target: { value } }) =>
                  setCredentials({ ...credentials, email: value })
                }
                value={credentials.email}
                type="email"
                placeholder="Email"
              />
            </FormItem>

            <FormItem
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                prefix={
                  <Eye
                    size={16}
                    strokeWidth={1}
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                onChange={({ target: { value } }) => {
                  setCredentials({ ...credentials, password: value });
                }}
                value={credentials.password}
                type="password"
                placeholder="Password"
              />
            </FormItem>
            <FormItem>
              <Link href="#!">
                <a className="text-xs-right">
                  <small>Forgot password</small>
                </a>
              </Link>
              <Button
                onClick={() => signInEmailAndPassword(credentials)}
                type="primary"
                htmlType="submit"
                block
                className="mt-3"
              >
                Login
              </Button>
            </FormItem>

            <FormItem>
              <Button
                onClick={() => router.replace("/signup")}
                type="dashed"
                htmlType="submit"
                block
                className="mt-3"
              >
                Create Account
              </Button>
            </FormItem>

            <div className="text-center">
              <small className="text-muted">
                <span>Don't have an account yet?</span>{" "}
                <a onClick={signIn}>&nbsp;Sign in with Google!</a>
              </small>
            </div>
          </Form>
        </Card.Grid>
      </Card>
    </Row>
  );
};

export default Signin;
