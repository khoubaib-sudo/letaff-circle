import { Modal } from "antd";
import ReactPlayer from "react-player";

const PreviewModal = ({ showModal, setShowModal, preview }) => {
  return (
    <>
      <Modal
        title="Course Preview"
        centered
        open={showModal}
        onCancel={() => setShowModal(!showModal)}
        width={1000}
        footer={null}
      >
        <div className="wrapper">
          <ReactPlayer
            url={preview}
            playing={showModal}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
