import { Button, Form, Input, Upload, Switch } from "antd";
import { SaveOutlined, InboxOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

const { Dragger } = Upload;
const { TextArea } = Input;

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress,
}) => {
  return (
    <div className="container pt-3">
      <Form
        name="complex-form"
        onSubmit={handleUpdateLesson}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 118 }}
        style={{ maxWidth: 800 }}
      >
        <Form.Item>
          <Input
            name="title"
            style={{ width: 325 }}
            onChange={(e) => setValues({ ...current, title: e.target.value })}
            value={current.title}
            autoFocus
            required
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            name="content"
            rows={4}
            onChange={(e) => setValues({ ...current, content: e.target.value })}
            value={current.content}
            style={{ width: 360 }}
          />
        </Form.Item>
        <Form.Item className="flex justify-center">
          <Switch
            checkedChildren="Preview"
            unCheckedChildren="Postview"
            className="bg-purple-500 "
          />
        </Form.Item>
        <Form.Item>
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadVideoButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button
            onClick={handleUpdateLesson}
            className="bg-purple-500 text-white flex items-center mr-2"
            type="primary"
            size="large"
            shape="round"
            loading={uploading}
            disabled={!current.title || !current.video}
          >
            <SaveOutlined className="mr-1" />
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateLessonForm;
