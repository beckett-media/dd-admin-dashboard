import React, { useState } from "react";
import NewBlog from "../create-blog";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { handleProductEditRequest } from "~/store/product/action";
import { getEditLoader } from "~/store/product/selectors";

const BlogEdit = () => {
	const { query = {} } = useRouter();

	const dispatch = useDispatch();
	const isEditLoading = useSelector(getEditLoader);
	const [blogData, setBlogData] = useState()

	React.useEffect(() => {
		// call action for blogEdit
		// 	if (query.bid && !isEditLoading) dispatch(handleProductEditRequest(query.bid));

		setBlogData("data")
	},
		//  [query.pid]
	);
	// console.log(blogData)

	return (
		<>
			<NewBlog blogData={blogData} />
		</>
	);
};

export default BlogEdit;
