let NeDB = require("nedb");
let db = new NeDB({
  filename: "users.db",
  autoload: true,
});

module.exports = (app) => {
  app.get("/users", (req, res) => {
    db.find({})
      .sort({ nome: 1 })
      .exec((err, users) => {
        if (err) {
          console.log(`error: ${err}`);
          res.status(400).json({
            error: err,
          });
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
}; // fim module.exports
