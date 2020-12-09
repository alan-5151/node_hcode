let NeDB = require("nedb");
let db = new NeDB({
  filename: "users",
  autoload: true,
});

module.exports = (app) => {
  let route = app.route("/users");
  route.get((req, res) => {
    db.find({})
      .sort({ nome: -1 })
      .exec((err, users) => {
        if (err) {
          app.utils.error.send(err, req, res);
        } else {
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Content-Type", "application/json");

          res.json({
            users,
          });
        }
      });
  });

  route.post((req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    db.insert(req.body, (err, users) => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(users);
      }
    });
  });

  app.get("/users/admin", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.json({
      users: [],
    });
  });
};
