// Importa o framework Express para construir aplicações web
import express from "express";

// Importa o middleware Multer para manipular uploads de arquivos
import multer from "multer";

// Importa funções controladoras para lidar com a lógica relacionada a posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

import cors from "cors";
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200

}

// Configura o armazenamento em disco do Multer
const storage = multer.diskStorage({
  // Especifica o diretório para salvar os arquivos enviados (substitua pelo seu caminho desejado)
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Callback com erro (null) e diretório de destino
  },
  // Utiliza o nome original do arquivo para manter clareza e evitar conflitos (opcional)
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Callback com erro (null) e nome original do arquivo
  }
});

// Cria uma instância do Multer com o armazenamento configurado
const upload = multer({ dest: "./uploads", storage }); // Combina destino padrão e armazenamento

// Define as rotas da aplicação usando o Express
const routes = (app) => {
  // Analisa dados JSON recebidos para corpos de requisição (middleware)
  app.use(express.json());
  app.use(cors(corsOptions));

  // GET /posts: Manipulador de rota para recuperar todos os posts (usa o controlador listarPosts)
  app.get("/posts", listarPosts);

  // POST /posts: Manipulador de rota para criar um novo post (usa o controlador postarNovoPost)
  app.post("/posts", postarNovoPost);

  // POST /upload: Manipulador de rota para enviar uma imagem (usa upload.single('imagem') e o controlador uploadImagem)
  // - upload.single('imagem'): Aplica a configuração do Multer com o nome do campo 'imagem' para upload de arquivo único
  app.post("/upload", upload.single("imagem"), uploadImagem);

app.put("/upload/:id", atualizarNovoPost)
};

export default routes; // Exporta a função routes para uso na aplicação principal