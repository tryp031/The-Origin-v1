import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Row, Card, Divider } from "antd";
import { Eye, Mail, User } from "react-feather";

import Link from "next/link";

import useUser from "../../hooks/useUser";

const FormItem = Form.Item;

const gridStyle = {
  width: "100%",
  textAlign: "center",
};

const SignUp = () => {
  const { signUpEmailAndPassword } = useUser();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="px-3 bg-white mh-page pageContainerSignUp"
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
          <Divider orientation="left">Sign Up</Divider>
          <Form
            layout="vertical"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormItem
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                prefix={
                  <User
                    size={16}
                    strokeWidth={1}
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                onChange={({ target: { value } }) =>
                  setCredentials({ ...credentials, username: value })
                }
                value={credentials.username}
                type="text"
                placeholder="Name"
              />
            </FormItem>

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
            <FormItem
              label="Confirm Password"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
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
                placeholder="Confirm Password"
              />
            </FormItem>
            <FormItem>
              <Button
                onClick={() => signUpEmailAndPassword(credentials)}
                type="primary"
                htmlType="submit"
                block
                className="mt-3"
              >
                Create
              </Button>
            </FormItem>

            <FormItem>
              <Button
                onClick={() => router.replace("/signin")}
                type="dashed"
                htmlType="submit"
                block
                className="mt-3"
              >
                Go to Login
              </Button>
            </FormItem>
          </Form>
        </Card.Grid>
      </Card>
    </Row>
  );
};

export default SignUp;
