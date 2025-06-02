// routes.js
import express from "express";
import consultas from "./consultasRoutes.js";
import pacientes from "./pacientesRoutes.js";
import medicos from "./medicosRoutes.js";
import prescricoes from "./prescricoesRoutes.js";
import auth from "./auth.js";

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: "API Int-Sistemas" });
  });

  app.use(
    express.json(),
    auth,
    consultas,
    pacientes,
    medicos,
    prescricoes
  );
};

export default routes;
