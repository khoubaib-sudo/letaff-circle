import { Button, Form, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const AddLessonForm = ({ values, setValues, handleAddLesson , uploading}) => {
  return (
    <div className="container pt-3">
      <Form
        name="complex-form"
        onSubmit={handleAddLesson}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 118 }}
        style={{ maxWidth: 800 }}
      >
        <Form.Item>
          <Input
            name="title"
            style={{ width: 325 }}
            placeholder="Title"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            value={values.title}
            autoFocus
            required
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            rows={4}
            placeholder="Content"
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            value={values.content}
            style={{ width: 360 }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={handleAddLesson}
            className="bg-purple-500 text-white flex items-center"
            type="primary"
            size="large"
            shape="round"
            loading={uploading}
          >
            <SaveOutlined className="mr-1" />
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddLessonForm;
