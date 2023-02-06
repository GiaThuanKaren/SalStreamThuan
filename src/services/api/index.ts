import axios from "axios";
const ApiKey: string = "api_key=bec721bcb126b9938b6c2f7b39448c63";
const Base_Url: string = "https://api.themoviedb.org/3";
const ImageOption = {
  w500: "https://image.tmdb.org/t/p/w500",
  original: "https://image.tmdb.org/t/p/original",
};

export const GetMoveOrTvByParam = async function ({
  title,
  href,
  page,
}: {
  title?: string;
  href?: string;
  page?: string;
}) {
  try {
    let { data } = await axios.get(
      `${Base_Url}${href}?${ApiKey}&page=${page ? page : "1"}`
    );
    console.log(`${Base_Url}${href}?${ApiKey}&page=${page ? page : "1"}`);
    return data;
  } catch (e) {}
};

export const GetTreningWeek = async function () {
  try {
    let { data } = await axios.get(`${Base_Url}/trending/movie/week?${ApiKey}`);
    console.log(`${Base_Url}/trending/movie/week?${ApiKey}`);
    console.log(123);
    return data;
  } catch (e) {
    throw e;
  }
};

export const GetMovieLastest = async function () {
  try {
    let { data } = await axios.get(`${Base_Url}/movie/latest?${ApiKey}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const GetMovieTopRating = async function () {
  try {
    let { data } = await axios.get(`${Base_Url}/movie/top_rated?${ApiKey}`);
    return data;
  } catch (e) {}
};

export const GetMovieNowPlaying = async function () {};

export const GetListByIdGenre = async function (idGenre: string) {
  try {
    let { data } = await axios.get(
      `${Base_Url}/discover/movie?${ApiKey}&with_genres=${idGenre}`
    );
    return data;
  } catch (e) {
    throw e;
  }
};
