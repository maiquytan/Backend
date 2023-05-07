import blog from "../model/blog.js";

const blogController = {
  //GET ALL USERS
  getAllBlog: async(req,res) => {
    try {
      const bl = await blog.find();
      res.status(200).json(bl);
    }
    catch(err) {
      res.status(500).json(err);
    }
  },
}
export default blogController;
