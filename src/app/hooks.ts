import { useSelector } from "react-redux";
import { TypedUseSelectorHook,useDispatch } from "react-redux";
import { AppDispatch,RootState } from "./store";

export const useAppDispatch :() => AppDispatch = useDispatch
export const useAppSelectore: TypedUseSelectorHook<RootState>=useSelector;
