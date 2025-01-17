import { Button, Form, Input, Select, Avatar, Badge } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  handleCategoryChange,
  handleImageRemove = (f) => f,
  editPage = false,
}) => {
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }
  return (
    <>
      {values && (
        <div class="flex flex-col md:flex-row">
          <Form
            name="complex-form"
            onSubmit={handleSubmit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 118 }}
            style={{ maxWidth: 800 }}
          >
            <Form.Item>
              <Input
                name="name"
                style={{ width: 360 }}
                placeholder="Name of the course"
                value={values.name}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <TextArea
                name="description"
                rows={4}
                placeholder="Description you can use markdown)"
                value={values.description}
                onChange={handleChange}
                style={{ width: 360 }}
              />
            </Form.Item>

            <Form.Item>
              <Select
                type="text"
                className="form-control"
                name="category"
                placeholder="Category"
                value={values.category}
                onChange={handleCategoryChange}
                style={{ width: 360 }}
              >
                <Select.Option disabled hidden value="">
                  Category
                </Select.Option>
                <Select.Option value="Web Development">
                  Web Development
                </Select.Option>
                <Select.Option value="Ux Design">Ux Design</Select.Option>
                <Select.Option value="Marketing">Marketing</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex" }}>
                <Select
                  value={values.paid}
                  onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
                  placeholder="pricing"
                  style={{ width: 275 }}
                >
                  <Select.Option value={false}>Free</Select.Option>
                  <Select.Option value={true}>Paid</Select.Option>
                </Select>
                {values.paid && (
                  <div className="form-group">
                    <Select
                      defaultValue="9.99"
                      onChange={(v) => setValues({ ...values, price: v })}
                      tokenSeparators={[,]}
                    >
                      {children}
                    </Select>
                  </div>
                )}
              </div>
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="image">
                  <Button
                    className="bg-white  flex items-center"
                    icon={<UploadOutlined />}
                    onClick={() => document.getElementById("image").click()}
                  >
                    {values.loading ? "Uploading" : "Image Upload"}
                  </Button>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImage}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                {preview && (
                  <Badge count="X" onClick={handleImageRemove}>
                    <Avatar src={preview} shape="square" size={200} />
                  </Badge>
                )}
                {editPage && values.image && (
                  <Avatar
                    src={values.image.secure_url}
                    shape="square"
                    size={200}
                  />
                )}
              </div>
            </Form.Item>

            <Form.Item colon={false}>
              <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="bg-purple-600 text-white"
                loading={values.loading}
                type="primary"
                size="large"
                shape="round"
              >
                {values.loading ? "Saving..." : "Save & Continue"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default CourseCreateForm;
