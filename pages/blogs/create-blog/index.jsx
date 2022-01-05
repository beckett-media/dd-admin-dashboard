import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import FormAccountSettings from "~/components/shared/forms/FormAccountSettings";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import BlogPresBannerUpload from "~/components/shared/upload/BlogPresBannerUpload";
import { getUserInfo } from "~/store/auth/selectors";
import Authenticated from "~/repositories/AuthHoc";
import { Editor } from "@tinymce/tinymce-react";
import blogPressRepo from "~/repositories/BlogPressRespository";
import { Col, Form, notification, Input } from "antd";
import Router from "next/router";

const NewBlog = (props) => {
  const [bannerImage, setBannerImage] = useState(null);
  const init = {
    selector: "textarea#open-source-plugins",
    plugins:
      "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
    imagetools_cors_hosts: ["picsum.photos"],
    menubar: "file edit view insert format tools table help",
    toolbar:
      "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    link_list: [
      { title: "My page 1", value: "https://www.tiny.cloud" },
      { title: "My page 2", value: "http://www.moxiecode.com" },
    ],
    image_list: [
      { title: "My page 1", value: "https://www.tiny.cloud" },
      { title: "My page 2", value: "http://www.moxiecode.com" },
    ],
    image_class_list: [
      { title: "None", value: "" },
      { title: "Some class", value: "class-name" },
    ],
    importcss_append: true,
    file_picker_callback: function (callback, value, meta) {
      /* Provide file and text for the link dialog */
      if (meta.filetype === "file") {
        callback("https://www.google.com/logos/google.jpg", {
          text: "My text",
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === "image") {
        callback("https://www.google.com/logos/google.jpg", {
          alt: "My alt text",
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === "media") {
        callback("movie.mp4", {
          source2: "alt.ogg",
          poster: "https://www.google.com/logos/google.jpg",
        });
      }
    },
    templates: [
      {
        title: "New Table",
        description: "creates a new table",
        content:
          '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
      },
      {
        title: "Starting my story",
        description: "A cure for writers block",
        content: "Once upon a time...",
      },
      {
        title: "New list with dates",
        description: "New List with dates",
        content:
          '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
      },
    ],
    template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
    template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar:
      "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: "sliding",
    contextmenu: "link image imagetools table",
    skin: "oxide",
    content_css: "default",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  };
  const [blogPressData, setBlogPressData] = useState();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);

  return (
    <ContainerDefault title="New Blog">
      <HeaderDashboard
        title="New Blog"
        description="Write from your heart in Due Dilly Blog"
      />
      <Col xs={24} sm={12} md={12}>
        <div className="form-group">
          <Input.TextArea
            style={{ width: "100%" }}
            value={title}
            className="form-control"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            showCount={true}
            maxLength={40}
            placeholder="Title goes here..."
          />
        </div>
      </Col>
      <BlogPresBannerUpload setBannerImage={setBannerImage} />
      <Editor
        init={init}
        onEditorChange={setBlogPressData}
        apiKey="7do9gdezf8u4fuujriwhqjhevhjixd1v0yuq2zy97gzt8o13"
      />
      <span>
        <a
          className="ps-btn"
          onClick={async () => {
            try {
              const { data } = await blogPressRepo.createBlogPress({
                title,
                bannerImage,
                data: blogPressData,
                type: "blog",
              });
              notification.success({
                message: "Published",
                description: data.title,
              });
              Router.push("/blogs");
            } catch (error) {
              notification.error({ message: "Error", description: error });
            }
          }}
        >
          Save And Publish Blog
        </a>
      </span>
    </ContainerDefault>
  );
};

// const connectStateToProps = (state) => {
//     return {
//         userInfo: getUserInfo(state),
//     };
// };

// export default connect(connectStateToProps)(Authenticated(SettingsPage));
export default NewBlog;
