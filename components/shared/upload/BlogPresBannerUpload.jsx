import React, { useState } from "react";
import { Upload } from "antd";
import { getBase64 } from "./PicturesWall";
import { useEffect } from "react";

const BlogPressBannerUpload = ({ setBannerImage, previousImage }) => {
  const [defaultFileList, setDefaultFileList] = useState([]);

  const handleOnChange = ({ file, fileList }) => {
    setDefaultFileList(fileList);
    if (!file.status) {
      getBase64(file).then((base64) => {
        setBannerImage(base64);
      });
    } else {
      setBannerImage(null);
    }
  };

  useEffect(() => {
    if (previousImage) setDefaultFileList(previousImage);
  }, [previousImage]);

  return (
    <div class="container">
      <Upload
        accept="image/*"
        onChange={handleOnChange}
        listType="picture-card"
        fileList={defaultFileList}
        className="image-upload-grid"
        beforeUpload={() => false}
      >
        {defaultFileList.length >= 1 ? null : <div>Upload Main Banner</div>}
      </Upload>
    </div>
  );
};

export default BlogPressBannerUpload;
