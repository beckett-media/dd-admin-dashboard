import React from "react";
import { message, Upload, Modal } from "antd";
import { baseUrl } from "~/repositories/Repository";
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class PicturesWallStore extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  photoUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList }, () => {
      if (this.props.onChange) this.props.onChange(fileList);
    });
  };

  handleFileRemove = (file) => {
    const currentImages = this.props.value || [];
    if (currentImages.includes(file.uid)) {
      this.props.handleProductImageDelete(file);
    }
  };
  render() {
    const currentImages = (this.props.value || []).map((i) => ({ uid: i, name: "image.png", status: "done", url: `${baseUrl}/${i}` }));

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <i class="fa fa-plus"></i>
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload customRequest={this.photoUpload} multiple={false} maxCount={1} onRemove={this.handleFileRemove} accept="image/png,image/jpeg" response={false} listType="picture-card" fileList={fileList.length ? fileList : currentImages} onPreview={this.handlePreview} onChange={this.handleChange}>
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWallStore;

/*
 beforeUpload: file => {
     
    },

	 
			
		  

*/
