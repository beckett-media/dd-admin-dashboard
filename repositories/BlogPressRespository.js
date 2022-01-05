import Repository, { baseUrl, getError } from "./Repository";

const routes = {
  blogPress: "/blog-press",
};

class BlogPressRespository {
  async blogPressList({ page = 1, perPage = 10, type }) {
    try {
      const url = `${baseUrl}${routes.blogPress}/${perPage}/${page}/${type}`;
      const request = await Repository.get(url);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async createBlogPress(blogsPress) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.blogPress}`,
        blogsPress
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async getBlogFull(blogId) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.blogPress}/${blogId}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async editUpdateBlog(blogPress) {
    try {
      const blogPressId = blogPress.id;
      const request = await Repository.put(
        `${baseUrl}${routes.blogPress}/${blogPressId}`,
        {
          title: blogPress.title,
          data: blogPress.data,
          bannerImage: blogPress.bannerImage,
          type: blogPress.type,
        }
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async deleteBlogPress(blogPressId) {
    try {
      await Repository.delete(`${baseUrl}${routes.blogPress}/${blogPressId}`);
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new BlogPressRespository();
