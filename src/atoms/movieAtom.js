import { atom } from "recoil";
import axios from "../axios";

export const displayedMoviesState = atom({
    key: "displayedMoviesState",
    default: null
});