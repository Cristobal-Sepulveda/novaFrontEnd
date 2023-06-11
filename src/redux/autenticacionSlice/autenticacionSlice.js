import { createSlice } from "@reduxjs/toolkit/";

export const AutenticacionSlice = createSlice({
    name: "Autenticacion",
    initialState: {
        autBack: {
            status: 'checking',
            token: null,
            id: null,
            name: null,
            lastname: null,
            email: null,
            rolId: null,
            error: null,
        }
    },
    reducers: {
        login: (state, {payload}) => {
            state.autBack.status = 'logged';
            state.autBack.token = payload.token;
            state.autBack.id = payload.usuario.id;
            state.autBack.name = payload.usuario.name;
            state.autBack.lastname = payload.usuario.lastname;
            state.autBack.email = payload.usuario.email;
            state.autBack.rolId = payload.usuario.rols[0].id;
        },
        logout: (state) => {
            state.autBack.status = 'notLogged';
            state.autBack.token = null;
            state.autBack.id = null;
            state.autBack.name = null;
            state.autBack.lastname = null;
            state.autBack.email = null;
            state.autBack.rolId = null;
        },
        setError: (state, {payload}) => {
            state.autBack.error = payload;
        }
    }   
});

export const { login, logout, setError } = AutenticacionSlice.actions;