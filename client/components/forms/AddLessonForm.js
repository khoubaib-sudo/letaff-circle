
import { Button, Form, Input, Upload } from "antd";
import { SaveOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { TextArea } = Input;

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  handleVideoRemove,
}) => {
  const { title, video } = values;
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
            name="content"
            rows={4}
            placeholder="Content"
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            value={values.content}
            style={{ width: 360 }}
          />
        </Form.Item>
        <Form.Item>
          <Dragger
            onChange={handleVideo}
            accept="video/*"
            multiple={false}
            onRemove={handleVideoRemove}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: "#8B5CF6" }} />
            </p>
            <p className="ant-upload-text">{uploadButtonText}</p>
            <p className="ant-upload-hint">Support for a single video upload</p>
          </Dragger>
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button
            onClick={handleAddLesson}
            className="bg-purple-500 text-white flex items-center"
            type="primary"
            size="large"
            shape="round"
            loading={uploading}
            disabled={!values.title || !values.video}
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
