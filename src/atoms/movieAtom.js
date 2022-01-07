import { atom } from "recoil";

export const displayedMoviesState = atom({
    key: "displayedMoviesState",
    default: null
});

export const selectedMovie = atom({
    key: "selectedMovie",
    default: null
});