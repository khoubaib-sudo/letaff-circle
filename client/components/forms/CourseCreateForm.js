
import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const CourseCreateForm = ({
    handleSubmit, handleImage, handleChange , values, setValues
}) => (
    <Form
        name="complex-form"
        onSubmit={handleSubmit}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 118,
        }}
        style={{
          maxWidth: 800, 
        }}
      >
        <Form.Item>
            <Form.Item
              name="name"
              noStyle
              rules={[
                {
                  required: true,
                  message: "name is required",
                },
              ]}
            >
              <Input
                name="name"
                style={{width: 360}}
                placeholder="Name of the course"
                value={values.name}
                onChange={handleChange}
              />
            </Form.Item>
        </Form.Item>

        <Form.Item>
          <TextArea
            name="description"
            rows={4}
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
            style={{width: 360}}
          />
        </Form.Item>

        <Form.Item>
          <Select
            value= {values.paid}
            onChange={v => setValues({...values, paid: !values.paid})}
            placeholder="pricing"
            style={{width: 360}}
          >
            <Select.Option value={false}>Free</Select.Option>
            <Select.Option value={true}>Paid</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item >
          <Upload name="image" type="file" onChange={handleImage} accept="image/*" hidden>
            <Button icon={<UploadOutlined />}> {values.loading ? 'Uploading' : 'Image Upload'} </Button>
          </Upload>
        </Form.Item>
        
        <Form.Item colon={false}>
          <Button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            loading={values.loading}
            className="bg-purple-500 hover:bg-black text-white "
          >
            {values.loading ? 'Saving...' : 'Save & Continue'}
          </Button>
        </Form.Item>
      </Form>
);

export default CourseCreateForm