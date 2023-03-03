import express from "express";

import {
  home,
  getUpload,
  postUpload,
  info,
  getEdit,
  postEdit,
  remove,
  search
} from "./movieController";

const movieRouter = express.Router();

// Add your magic here!

movieRouter.get("/", home);
movieRouter.route("/upload").get(getUpload).post(postUpload);
movieRouter.get("/movies/:id", info);
movieRouter.route("/movies/:id/edit").get(getEdit).post(postEdit);
movieRouter.get("/movies/:id/delete", remove);
movieRouter.get("/search", search);

export default movieRouter;
