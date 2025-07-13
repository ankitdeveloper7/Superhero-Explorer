import MD5 from "crypto-js/md5";
import axios from "axios";

// Get current time
function getTime() {
  let time = new Date().getTime();
  return time.toString();
}

// Make hash for API
function makeHash(time, privateKey, publicKey) {
  let string = time + privateKey + publicKey;
  let hash = MD5(string);
  return hash.toString();
}

// Get movies from Marvel API
export async function getMarvelMovies(offset = 0, limit = 20, searchTerm = "") {
  let time = getTime();
  let publicKey = "c7bd87aa8560732a7787bd5e4f488092";
  let privateKey = "deca5fd5d29b8b7ea207973d521ac6c30594f779";
  let hash = makeHash(time, privateKey, publicKey);

  let url =
    "https://gateway.marvel.com/v1/public/series?ts=" +
    time +
    "&apikey=" +
    publicKey +
    "&hash=" +
    hash +
    "&offset=" +
    offset +
    "&limit=" +
    limit;

  // Add search if user typed something
  if (searchTerm !== "") {
    url = url + "&titleStartsWith=" + searchTerm;
  }

  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error getting movies:", error);
    throw error;
  }
}

// Get comics from Marvel API
export async function getMarvelComics(offset = 0, limit = 20, searchTerm = "") {
  let time = getTime();
  let publicKey = "c7bd87aa8560732a7787bd5e4f488092";
  let privateKey = "deca5fd5d29b8b7ea207973d521ac6c30594f779";
  let hash = makeHash(time, privateKey, publicKey);

  let url =
    "https://gateway.marvel.com/v1/public/comics?ts=" +
    time +
    "&apikey=" +
    publicKey +
    "&hash=" +
    hash +
    "&offset=" +
    offset +
    "&limit=" +
    limit;

  // Add search if user typed something
  if (searchTerm !== "") {
    url = url + "&titleStartsWith=" + searchTerm;
  }

  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error getting comics:", error);
    throw error;
  }
}
