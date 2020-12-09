module.exports = (app) => {
  app.get("/", (req, res) => {
    res.statusCode = 200;
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Olá mundo!...</h1>");
  });
};
