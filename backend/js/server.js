import express, { json, request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const users = [];

function converterId(id) {
  const userId = parseInt(id);

  if (isNaN(userId)) {
    throw new Error("ID inválido. O ID deve ser um número.");
  }

  return userId;
}

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.put("/usuarios/:id", async (req, res) => {

  let idUsuario = req.params.id;
  let id = converterId(idUsuario);

  await prisma.user.update({
    where: {
      id: id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

app.listen(3000);
