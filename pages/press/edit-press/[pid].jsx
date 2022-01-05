import { useState, useEffect } from "react";
import EditBlogEditor from "~/components/elements/basic/EditBlogEditor";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import { handleProductEditRequest } from "~/store/blogPress/action";
import { getEditLoader } from "~/store/product/selectors";

import BlogPressRepo from "~/repositories/BlogPressRespository";

const PressEdit = () => {
  const { query = {} } = useRouter();
  const [isFullLoading, setIsFullLoading] = useState(true);

  const [press, setPress] = useState();

  useEffect(() => {
    async function getBlogFull() {
      try {
        const press = await BlogPressRepo.getBlogFull(query.pid);
        setPress(press.data?.blogPress);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFullLoading(false);
      }
    }
    if (query?.pid) {
      getBlogFull();
    }
  }, [query]);

  return (
    <>
      <EditBlogEditor blog={press} pageName="press" />
    </>
  );
};

export default PressEdit;
