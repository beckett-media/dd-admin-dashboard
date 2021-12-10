import React from "react";
import { Input, Form, Button } from "antd";
import { useDispatch } from "react-redux";
import { updateUserName } from "~/store/userInfo/action";

const FormAccountSettings = (props) => {
  const dispatch = useDispatch();
  const formRef = React.useRef();
  const { userInfo } = props;

  React.useEffect(() => {
    if (userInfo && formRef.current)
      formRef.current.setFieldsValue({
        ...userInfo,
      });
  }, [userInfo]);

  const onUserNameSave = () => {
    const username = formRef.current.getFieldValue("username");
    dispatch(updateUserName(username));
  };

  return (
    <Form ref={formRef} className="ps-form--account-settings" layout="vertical">
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your title",
                },
              ]}
            >
              <Input
                disabled
                className="form-control"
                type="text"
                placeholder="Enter Full name..."
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input
                disabled
                className="form-control"
                type="email"
                placeholder="Enter Email..."
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="ps-form__submit text-center">
        {/* <button className="ps-btn ps-btn--gray mr-3">Cancel</button> */}
        {/* <button className="ps-btn success">Update Profile</button> */}
      </div>
    </Form>
  );
};

export default FormAccountSettings;
