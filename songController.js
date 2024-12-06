import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as songService from "./songService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const listSongs = async (c) => {
  const data = { songs: songService.getAllSongs() };
  return c.html(eta.render("index.eta", data));
};

const addSong = async (c) => {
  const body = await c.req.parseBody();
  const song = {
    name: body.name || "Unknown Song",
    duration: parseInt(body.duration) || 0,
  };
  songService.addSong(song);
  return c.redirect("/");
};

export { listSongs, addSong };
