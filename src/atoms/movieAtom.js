import { atom, selector } from "recoil";
import requests from "../requests";
import axios from "../axios";

const popular = selector({
    key: 'popular',
    get: async ({get}) => {
        const request = await axios.get(requests.getPopular);
      return request.data.results;
    }
  })

export const displayedMoviesState = atom({
    key: "displayedMoviesState",
    default: popular
});

export const selectedMovie = atom({
    key: "selectedMovie",
    default: null
});

export const loadingState = atom({
    key: "isLoading",
    default: true
});