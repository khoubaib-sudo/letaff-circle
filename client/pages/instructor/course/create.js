import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { Button, Form, Input, Select, Space, Upload, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const CourseCreate = () => {
  //state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
  });
  const { Option } = Select;

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = () => {
    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const courseCreateForm = () => {
    return (
      <Form
        name="complex-form"
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800, // Increase max width of form
        }}
      >
        <Form.Item>
          <Space>
            <Form.Item
              name="username"
              noStyle
              rules={[
                {
                  required: true,
                  message: "name is required",
                },
              ]}
            >
              <Input
                style={{
                  width: 360, // Increase width of input
                }}
                placeholder="Name of the course"
              />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item>
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

        <Form.Item>
          <Select placeholder="Description">
            <Select.Option value="Free">Free</Select.Option>
            <Select.Option value="Paid">Paid</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="upload" valuePropName="fileList">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Image upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item colon={false}>
          <Button  htmlType="submit"  className="bg-purple-500 hover:bg-black text-white ">
            Submit & continue
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <InstructorRoute style={{ position: 'fixed' }}>
      <>
      <div style={{float: "right", paddingTop: "80px", paddingRight:"200px" }}>
        {courseCreateForm()}
      </div>
      <div style={{ width: "50%", float: "left", paddingTop: "80px", paddingLeft:"120px"}}>
        <h1 className="text-7xl capitalize font-semibold">
          Create
          <br />
          <span className="text-purple-500 capitalize">Course</span>
        </h1>
      </div>
      </>
    </InstructorRoute>
    
  );
};

export default CourseCreate;
