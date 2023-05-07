import User from '../model/user.js';

const userController = {

  getAllUsers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 8;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};

      const searchText = req.query.searchText ? { username: { $regex: req.query.searchText, $options: 'i' } } : {};

      const totalUsers = await User.countDocuments(searchText).exec();
      if (endIndex < totalUsers) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
          limit: limit
        };
      }
      results.totalUsers = totalUsers;
      results.users = await User.find(searchText).skip(startIndex).limit(limit).exec();
      res.json(results);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUser: async (req, res) => {
    try {
      const decoded = jwt.verify(req.headers.authorization.split(" ")[1], JWT_ACCESS_KEY);
      const userId = decoded._id;
      console.log(userId)
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //DELETE USER
  deleteUser: async (req, res) => {
    try{
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    }catch(err){
      res.status(500).json(err);
    }
  }
}

export default userController;
