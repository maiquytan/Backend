import jwt from 'jsonwebtoken';

const middlewareController = {

  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const access_token = token.split(" ")[1];
      jwt.verify(access_token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    }
    else {
      res.status(401).json("You are not authenticated");
    }
  },

  verifyTokenAndAdminAuth: (req,res,next) => {
    middlewareController.verifyToken(req,res, () => {
      if(req.user.id == req.params.id || req.user.admin) {
        next();
      }
      else {
        res.status(403).json("You are not allowed to delete other");
      }
    })
  }
}

export default middlewareController;
