const express = require("express");
const cors = require("cors");

const gameRoutes = require("./src/routes/games_route");
const consoleRouters = require("./src/routes/consoles_route");
const genderRouters = require("./src/routes/genders_route");
const PEGIRouters = require("./src/routes/PEGI_route");

const app = express();

const port = 3000;
const route = "/api/v1";

app.use(express.json());

app.use(cors());

// GAMES API

app.use(route, gameRoutes);

// CONSOLES API

app.use(route, consoleRouters);

// GENDER API

app.use(route, genderRouters);

// PEGI API

app.use(route, PEGIRouters);

// Listen Port

app.listen(port, () => {
  console.log(
    `CORS-enabled web server listening on port http://localhost:${port}`
  );
});

module.exports = app;
