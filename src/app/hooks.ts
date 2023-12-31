import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux/es/exports";
import { AppDispatch, RootState } from "./store";

 


 export const useAppDispatch: () => AppDispatch = useDispatch;
 export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
