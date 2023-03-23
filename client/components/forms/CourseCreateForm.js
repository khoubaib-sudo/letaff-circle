
import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const CourseCreateForm = ({
    handleSubmit, handleImage, handleChange , values, setValues
}) => {
    const children = []
    for(let i=9.99 ; i <= 99.99 ; i++){
        children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
    }
    return(
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
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                  />
                </Form.Item>
            </Form.Item>
    
            <Form.Item>
              <TextArea
                name="description"
                rows={4}
                placeholder="Description"
                value={values.description}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                style={{width: 360}}
              />
            </Form.Item>
            <Form.Item>
            <Select
                name="category"
                placeholder="Category"
                value={values.category}
                onChange={(value) => handleChange("category", value)}
                style={{width: 360}}
              >
                <Select.Option disabled hidden value="">
                    Category
                </Select.Option>
                <Select.Option  value="Web Development">Web Development</Select.Option>
                <Select.Option value="Ux Design">Ux Design</Select.Option>
                <Select.Option value="Marketing">Marketing</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item >
            <div style={{ display: "flex" }}>
              <Select
                value= {values.paid}
                onChange={v => setValues({...values, paid: !values.paid})}
                placeholder="pricing"
                style={{width: 275}}
              >
                <Select.Option value={false}>Free</Select.Option>
                <Select.Option value={true}>Paid</Select.Option>
              </Select>
              {values.paid && 
                    <div className="form-group">
                        <Select 
                            defaultValue="9.99"
                            onChange={v => setValues({...values, price: v})}
                            tokenSeparators={[,]}
                        >
                        {children}  
                        </Select>
                    </div>
                }
                </div>
            </Form.Item>
    
            <Form.Item >
              <Upload type="file" name="image"  onChange={handleImage} accept="image/*" hidden>
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
}

export default CourseCreateForm