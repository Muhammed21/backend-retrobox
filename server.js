const express = require("express");
const cors = require("cors");
const { toNodeHandler } = require("better-auth/node");
const { fromNodeHeaders } = require("better-auth/node");

const { auth } = require("./src/lib/auth");
const gameRoutes = require("./src/api/routes/games_route");
const consoleRouters = require("./src/api/routes/consoles_route");
const genderRouters = require("./src/api/routes/genders_route");
const PEGIRouters = require("./src/api/routes/PEGI_route");
const emailRoute = require("./src/api/routes/email_route");
const handler = require("./src/api/checkout/route");

const app = express();

const port = 8080;
const route = "/api/v1";
const CLIENT_SIDE_URL = process.env.BETTER_AUTH_URL;

app.use(
  cors({
    origin: `${CLIENT_SIDE_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// AUTHENTIFICATION

app.all("/api/auth/*", toNodeHandler(auth));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

// MONT EXPRESS JSON

app.use(express.json());

// STRIPE ROUTES

app.post(`${route}/checkout/stripe`, handler);

// EMAIL API

app.use(route, emailRoute);

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
