import React from "react";
import { Avatar, Upload, Spin, Row } from "antd";
import { useDispatch } from "react-redux";
import { updateProfilePhoto } from "~/store/userInfo/action";
import { baseUrl } from "~/repositories/Repository";
import { useState } from "react";
import { getBase64 } from "./PicturesWall";

const AvatarUpload = ({ profilePhoto }) => {
  const [isloadingComplete, setLoading] = useState(true);

  const dispatch = useDispatch();

  const onFileUploadComplete = (file) => {
    if (!file) return setLoading(true);
    getBase64(file.originFileObj).then((base64) => {
      setLoading(base64);
    });
  };

  const onChange = (payload) => {
    const { file } = payload;

    if (!isloadingComplete) return;

    setLoading(true);
    dispatch(updateProfilePhoto(file, (item) => onFileUploadComplete(item)));
  };

  const url = `${baseUrl}/${profilePhoto}`;

  return (
    <>
      <Upload showUploadList={false} accept="image/png,image/jpeg" multiple={false} maxCount={1} onChange={onChange}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Avatar style={{ display: "flex", alignItems: "center", justifyContent: "center" }} {...(profilePhoto && isloadingComplete ? { src: typeof isloadingComplete === "string" ? isloadingComplete : url } : {})} size={200}>
            {!isloadingComplete ? <Spin /> : <p>Upload your Profile Pic</p>}
          </Avatar>
        </div>
      </Upload>
    </>
  );
};

export default AvatarUpload;
