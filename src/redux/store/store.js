import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { AutenticacionSlice } from "../autenticacionSlice/autenticacionSlice";
import { NovaSlice } from "../novaSlice/novaSlice";
import authMiddleware from "../../helpers/authMiddleware";

export default configureStore({
    reducer: {
        Autenticacion: AutenticacionSlice.reducer,
        Nova: NovaSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authMiddleware),
});

