import { createSlice } from "@reduxjs/toolkit";

export const NovaSlice = createSlice({
    name: "Nova",
    initialState: {
        novaPersonalById: {},
        novaPersonals: [],
        novaOrdenes: [],
        ordenesParaFiltrar : [],
        ordenesDisponibles: [],
        ordenesRendidas: [],
        ordenesRendidasDisponibles: [],
        novaOrdenById: {},
        patentes: [],
        allPatentes: [],
        cuadrantes: [],
        allCuadrantes: [],
        choferes: [],
        ayudantes: [],
        cuadratura: [],
        ordenesChoferById: [],
        ordenesAyudanteById: [],
        ordenesChofer: [],
        ordenesAyudante: [],
        codigoDeModificar: {},
        autorizado: "No autorizado",
        listaDePrecios: [],
        todosLosPrecios: [],
        faltantes: [],
        administradores: [],
        loading: false,
    },
    reducers: {
        getPersonal: (state, {payload}) => {
            state.novaPersonals = payload;
        },
        getPersonalById: (state, {payload}) => {
            state.novaPersonalById = payload;
        },
        getOrdenes: (state, {payload}) => {
            state.novaOrdenes = payload;
            state.ordenesParaFiltrar = payload.ordenDeRepartos;
        },
        ordenesDisponibles: (state) => {
            state.ordenesDisponibles = state.ordenesParaFiltrar?.filter(orden => orden.estado === true);
        },
        Rendidas: (state, {payload}) => {
            state.ordenesRendidas = payload;
        },
        RendidasDisponibles : (state, {payload}) => {
            state.ordenesRendidasDisponibles = payload;
        },
        getOrdenById: (state, {payload}) => {
            state.novaOrdenById = payload;
        },
        clearOrdenById: (state) => {
            state.novaOrdenById = {};
        },
        getPatentes: (state, {payload}) => {
            state.patentes = payload.sort((a,b) => a.name.localeCompare(b.name));
        },
        getAllPatentes: (state, {payload}) => {
            state.allPatentes = payload.sort((a,b) => a.name.localeCompare(b.name));
        },
        getCuadrantes: (state, {payload}) => {
            state.cuadrantes = payload.sort((a,b) => a.name.localeCompare(b.name));
        },
        getAllCuadrantes: (state, {payload}) => {
            state.allCuadrantes = payload.sort((a,b) => a.name.localeCompare(b.name));
        },
        getChoferes: (state, {payload}) => {
            state.choferes = payload.sort((a,b) => a.name.localeCompare(b.name));
        },
        getAyudantes: (state, {payload}) => {
            state.ayudantes = payload.sort((a,b) => a.name.localeCompare(b.name));
        },
        getCuadratura: (state, {payload}) => {
            state.cuadratura = payload;
        },
        getOrdenesChoferById: (state, {payload}) => {
            state.ordenesChoferById = payload;
        },
        getOrdenesAyudanteById: (state, {payload}) => {
            state.ordenesAyudanteById = payload;
        },
        getOrdenesChofer : (state, {payload}) => {
            state.ordenesChofer = payload;
        },
        getOrdenesAyudante : (state, {payload}) => {
            state.ordenesAyudante = payload;
        },
        getCodigoDeModificar: (state, {payload}) => {
            state.codigoDeModificar = payload;
        },
        limpiarCodigo: (state) => {
            state.codigoDeModificar = {};
        },
        setPorAutorizar: (state) => {
            state.autorizado = "Por autorizar";
        },
        setAutorizado : (state) => {
            state.autorizado = "Autorizado";
        },
        setNoAutorizado : (state) => {
            state.autorizado = "No autorizado";
        },
        getListaDePrecios: (state, {payload}) => {
            state.listaDePrecios = payload;
        },
        getAllFaltantes: (state, {payload}) => {
            state.faltantes = payload;
        },
        getAdministradores: (state, {payload}) => {
            state.administradores = payload;
        },
        getTodosLosPrecios : (state, {payload}) => {
            state.todosLosPrecios = payload;
        },
        changeLoading: (state) => {
            state.loading = !state.loading;
        }
    }
});

export const {  getPersonal,
                getPersonalById, 
                getOrdenes,
                getOrdenById, 
                getPatentes,
                getAllPatentes,
                getCuadrantes,
                getChoferes,
                getAyudantes,
                ordenesDisponibles,
                Rendidas,
                RendidasDisponibles,
                clearOrdenById,
                getCuadratura,
                getOrdenesChoferById,
                getOrdenesAyudanteById,
                getOrdenesChofer,
                getOrdenesAyudante,
                getCodigoDeModificar,
                limpiarCodigo,
                setPorAutorizar,
                setAutorizado,
                setNoAutorizado,
                getListaDePrecios,
                getAllFaltantes,
                getAdministradores,
                getTodosLosPrecios,
                changeLoading,
                getAllCuadrantes
            } = NovaSlice.actions;
            