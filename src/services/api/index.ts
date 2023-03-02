import { ShowToastify } from "./../../utils/index";
import { MovieModel } from "src/Model";
import axios from "axios";
const ApiKey: string = "api_key=bec721bcb126b9938b6c2f7b39448c63";
const Base_Url: string = "https://api.themoviedb.org/3";
const Base_url_dev: string = "http://192.168.1.5:5050";
const ImageOption = {
  w500: "https://image.tmdb.org/t/p/w500",
  original: "https://image.tmdb.org/t/p/original",
};
import { DetailSeaon } from "src/Model/tv";

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

export const GetListByIdGenre = async function (
  idGenre: string,
  page?: string
) {
  try {
    let { data } = await axios.get(
      `${Base_Url}/discover/movie?${ApiKey}&with_genres=${idGenre}&page=${
        page ? page : "1"
      }`
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const SearchMulti = async function (textSearch: any, page?: number) {
  console.log(textSearch, "SEARCH TEXT");
  try {
    let { data } = await axios.get(
      `${Base_Url}/search/multi?${ApiKey}&query=${textSearch}&page=${
        page ? page : 1
      }`
    );
    console.log(textSearch, "SEARCH TEXT 1");
    return data;
  } catch (e) {
    throw e;
  }
};

export const GetDetailMovie = async function (idMovie: any) {
  console.log(idMovie, "[IDMOVIE]");
  try {
    // let MovieDetail = await axios.get(`${Base_Url}/movie/${idMovie}?${ApiKey}`);
    // let SimilarMovie = await axios.get(
    //   `${Base_Url}/movie/${idMovie}/similar?${ApiKey}`
    // );
    // let VideoMovie = await axios.get(
    //   `${Base_Url}/movie/${idMovie}/videos?${ApiKey}`
    // );
    // let MovieRecommendation = await axios.get(
    //   `${Base_Url}/movie/${idMovie}/recommendations?${ApiKey}`
    // );
    let DataMovieDetail = await Promise.all([
      axios.get(`${Base_Url}/movie/${idMovie}?${ApiKey}`),
      axios.get(`${Base_Url}/movie/${idMovie}/videos?${ApiKey}`),
      axios.get(`${Base_Url}/movie/${idMovie}/recommendations?${ApiKey}`),
      axios.get(`${Base_Url}/movie/${idMovie}/similar?${ApiKey}`),
    ]);
    return {
      MovieDetail: DataMovieDetail[0].data,
      VideoMovie: DataMovieDetail[1].data,
      MovieRecommendation: DataMovieDetail[2].data,
      SimilarMovie: DataMovieDetail[3].data,
    };
  } catch (e) {
    throw e;
  }
};

export const GetDetailTV = async function (IdTV: any) {
  try {
    console.log("ID TV DETAIL", IdTV);
    let DataTVDetail = await Promise.all([
      axios.get(`${Base_Url}/tv/${IdTV}?${ApiKey}`),
      axios.get(`${Base_Url}/tv/${IdTV}/videos?${ApiKey}`),
      axios.get(`${Base_Url}/tv/${IdTV}/recommendations?${ApiKey}`),
      axios.get(`${Base_Url}/tv/${IdTV}/similar?${ApiKey}`),
    ]);
    return {
      TVDetail: DataTVDetail[0].data,
      VideoTV: DataTVDetail[1].data,
      TvRecommendation: DataTVDetail[2].data,
      SimilarTV: DataTVDetail[3].data,
    };
  } catch (e) {
    throw e;
  }
};

export const GetDetailSeason = async function (IdTV: any, NumberSeaon: any) {
  try {
    let detailSeason = await axios.get(
      `${Base_Url}/tv/${IdTV}/season/${NumberSeaon}?${ApiKey}`
    );
    console.log(
      `${Base_Url}/tv/${IdTV}/season/${NumberSeaon}/episode/1?${ApiKey}`
    );
    return {
      detailSeason: detailSeason.data,
    };
  } catch (e) {
    throw e;
  }
};

export const InsertNewComment = async function (
  parentCommentID: string = "",
  content: string = "",
  postID: string,
  idUserComment: string
) {
  try {
    await axios.post(`${Base_url_dev}/api/comment/insert_new`, {
      parentCommentID,
      content,
      postID,
      idUserComment,
    });
    ShowToastify("Thank you to your feedback");
  } catch (error) {
    console.log(error);
    ShowToastify(
      "Oops , Something went wrong , please try again or refresh this page !!!!"
    );
    throw error;
  }
};
