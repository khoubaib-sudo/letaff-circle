import { Button, Form, Input, Upload, Switch } from "antd";
import { SaveOutlined, InboxOutlined } from "@ant-design/icons";


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
            onChange={(e) => setCurrent({ ...current, title: e.target.value })}
            value={current.title}
            autoFocus
            required
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            name="content"
            rows={4}
            onChange={(e) =>
              setCurrent({ ...current, content: e.target.value })
            }
            value={current.content}
            style={{ width: 360 }}
          />
        </Form.Item>
        <Form.Item className="flex justify-center">
          <Switch
            checkedChildren="Preview"
            unCheckedChildren="Postview"
            className="bg-purple-500 "
            disabled={uploading}
            checked={current.free_preview}
            name="free_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
        </Form.Item>

        {/* <Form.Item>
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadVideoButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
        </Form.Item> */}
        <Form.Item>
          <Dragger onChange={handleVideo} accept="video/*" multiple={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: "#a855f7" }} />
            </p>
            <p className="ant-upload-text">{uploadVideoButtonText}</p>
            <p className="ant-upload-hint">Support for a single video upload</p>
          </Dragger>
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
