import Order from '../model/order.js';

const orderController = {
  //GET ALL ORDER
  // getOrder: async (req, res) => {
  //   try {
  //     const order = await Order.find();
  //     res.status(200).json(order);
  //   }
  //   catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  getOrder: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 8;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = {};

      const searchText = req.query.searchText ? { orderNumber: { $regex: req.query.searchText, $options: 'i' } } : {};

      const totalOrders = await Order.countDocuments(searchText).exec();
      if (endIndex < totalOrders) {
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
      results.totalOrders = totalOrders;
      results.orders = await Order.find(searchText).skip(startIndex).limit(limit).exec();
      res.json(results);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // GET ORDER BY USER
  getOrdersByUser: async (userId) => {
    try {
      const orders = await Order.find({ user: userId });
      return orders;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get orders');
    }
  },

  // GET ORDER BY ID
  getOrderById: async (_id) => {
    try {
      const order = await Order.findById(_id);
      return order;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get order');
    }
  },
  // CREATE ORDER
  createOrder: async (req, res) => {
    const { products, totalAmount, address } = req.body;
    const access_token = req.headers.authorization?.split(' ')[1];
    console.log(access_token)
    try {
      // Kiểm tra xem người dùng đã đăng nhập chưa
      if (!access_token) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      // Tạo mới đơn hàng
      const order = new Order({
        // user: req.user._id, // id của người dùng đang đăng nhập
        products,
        address
      });

      // Lưu thông tin đơn hàng vào database
      await order.save();

      // Trả về thông tin đơn hàng đã tạo thành công
      return res.status(200).json({ data: order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
export default orderController;
