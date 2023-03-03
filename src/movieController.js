/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!

export const home = async (req, res) => {
  const movies = await Movie.find({});

  res.render("home", { pageTitle: "Home", movies });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, summary, genres } = req.body;
  const movie = new Movie({
    title: title,
    summary: summary,
    year: Date.now(),
    rating: 0,
    genres: genres.split(",").map((word) => `#${word}`)
  });
  await movie.save();
  res.redirect(`/`);
};

export const info = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    return res.send("<h1>Movie not found.</h1>");
  }
  return res.render("info", { pageTitle: movie.title, movie });
};

export const getEdit = async (req, res) => {
  const {
    params: { id }
  } = req;
  const movie = await Movie.findById(id);

  if (!movie) {
    return res.send("<h1>Movie not found.</h1>");
  }
  return res.render("edit", { pageTitle: `Edit ${movie.title}`, movie });
};

export const postEdit = async (req, res) => {
  const {
    body: { title, summary, year, rating, genres },
    params: { id }
  } = req;
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    year,
    rating,
    genres: genres.split(",").map((word) => `#${word}`)
  });

  res.redirect(`/movies/${id}`);
};

export const remove = async (req, res) => {
  const {
    params: { id }
  } = req;
  await Movie.findByIdAndDelete(id);
  res.redirect("/");
};

export const search = async (req, res) => {
  const {
    query: { title }
  } = req;
  const movies = await Movie.find({
    title: { $regex: new RegExp(`${title}$`, "i") }
  });
  res.render("search", {
    pageTitle: `Filtering by title: ${title}`,
    movies
  });
};
