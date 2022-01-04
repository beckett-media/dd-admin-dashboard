import { useState, useEffect } from "react";
import EditBlogEditor from "~/components/elements/basic/EditBlogEditor";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { handleProductEditRequest } from "~/store/blogPress/action";
import { getEditLoader } from "~/store/product/selectors";

import BlogPressRepo from "~/repositories/BlogPressRespository";

const BlogEdit = () => {
  const { query = {} } = useRouter();
  const [isFullLoading, setIsFullLoading] = useState(true);

  const [blog, setBlog] = useState();

  useEffect(() => {
    async function getBlogFull() {
      try {
        const blog = await BlogPressRepo.getBlogFull(query.bid);
        setBlog(blog.data?.blogPress);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFullLoading(false);
      }
    }
    if (query?.bid) {
      getBlogFull();
    }
  }, [query]);

  return (
    <>
      <EditBlogEditor blog={blog} />
    </>
  );
};

export default BlogEdit;
