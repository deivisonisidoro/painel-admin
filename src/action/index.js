import api from '../services/Authentication/api';
import { actionsTypes } from '../constants';



/* AUTHENTICATION */
export async function requestLogin(email, password){
    const response = await api.post('/token', { email, password });
    return { type: actionsTypes.LOGIN_REQUEST, payload: response };
}

/* USER */
export async function getCountUsers(){
    const response = await api.get('/admin/count');
    return { type: actionsTypes.GET_COUNT_USER, payload: response.data };
}

export async function createUser(data) {
    const response = await api.post("/users", data);
    return { type: actionsTypes.CREATE_USER, payload: response };
}
export async function updateUser(id ,data) {
    const response = await api.put(`/admin/update/user/${id}`, data);
    return { type: actionsTypes.UPDATE_USER, payload: response };
}
export async function getUsers(page){
    const response = await api.get(`/admin/user/${page}`);
    return { type: actionsTypes.GET_USER, payload: response.data };
}
/* NOTIFICATION */
export async function createNotification(userTypeId, data){
    const response = await api.post(`/admin/notification/${userTypeId}`, data);
    return { type: actionsTypes.CREATE_NOTIFICATION, payload: response.data };
}
/*CHOOSE*/
export async function chooseUser(data) {
    const response = await api.post("/admin/choose", data);
    return { type: actionsTypes.CHOOSE_USER, payload: response };
}
export async function choosePmocModel(id) {
    const response = await api.post(`/pmoc-title/choose/${id}`,);
    return { type: actionsTypes.CHOOSE_USER, payload: response };
}
/* STATISTICS */
export async function getOsStatistics() {
    const response = await api.get("/admin/os-statistic");
    return { type: actionsTypes.STATISTICS_OS, payload: response.data };
}
export async function getUserStatistics() {
    const response = await api.get("/admin/user-statistic");
    return { type: actionsTypes.STATISTICS_USER, payload: response.data };
}
export async function getBudgetStatistics() {
    const response = await api.get("/admin/budget-statistic");
    return { type: actionsTypes.STATISTICS_BUDGET, payload: response.data };
}
export async function getCompanyStatistics() {
    const response = await api.get("/admin/company-statistic");
    return { type: actionsTypes.STATISTICS_COMPANY, payload: response.data };
}
export async function getTechnicianStatistics() {
    const response = await api.get("/admin/technician-statistic");
    return { type: actionsTypes.STATISTICS_TECHNICIAN, payload: response.data };
}
export async function getClientStatistics() {
    const response = await api.get("/admin/client-statistic");
    return { type: actionsTypes.STATISTICS_CLIENT, payload: response.data };
}

/* PMOC MODELS*/

export async function createPmocMold(data, ) {
    const response = await api.post("/pmoc-mold", data);
    return { type: actionsTypes.CREATE_PMOC_MOLD, payload: response};
}

export async function getPmocMold(data) {
    const response = await api.get("/pmoc-mold", data);
    return { type: actionsTypes.GET_PMOC_MOLD, payload: response };
}
export async function updatePmocMold(id, data) {
    const response = await api.put(`/pmoc-mold/${id}`, data);
    return { type: actionsTypes.UPDATE_PMOC_MOLD, payload: response };
}
export async function deletePmocMold(id) {
    const response = await api.delete(`/pmoc-mold/${id}`);
    return { type: actionsTypes.DELETE_PMOC_MOLD, payload: response };
}

/* PMOC TITLE */
export async function createPmocTitle(id, data) {
    const response = await api.post(`/pmoc-title/${id}`, data);
    return { type: actionsTypes.CREATE_PMOC_TITLE, payload: response };
}
export async function updatePmocTitle(id, data) {
    const response = await api.put(`/pmoc-title/${id}`, data);
    return { type: actionsTypes.UPDATE_PMOC_TITLE, payload: response };
}

export async function getPmocTitle(data) {
    const response = await api.get("/pmoc-title", data);
    return { type: actionsTypes.GET_PMOC_TITLE, payload: response };
}
export async function showPmocTitle(id) {
    const response = await api.get(`/pmoc-title/${id}`);
    return { type: actionsTypes.SHOW_PMOC_TITLE, payload: response };
}
export async function deletePmocTitle(id) {
    const response = await api.delete(`/pmoc-title/${id}`);
    return { type: actionsTypes.DELETE_PMOC_TITLE, payload: response };
}
/* PMOC OPTION */
export async function createPmocOption(id, data) {
    const response = await api.post(`/pmoc-option/${id}`, data);
    return { type: actionsTypes.CREATE_PMOC_OPTION, payload: response };
}
export async function updatePmocOption(id, data) {
    const response = await api.put(`/pmoc-option/${id}`, data);
    return { type: actionsTypes.UPDATE_PMOC_TITLE, payload: response };
}
export async function deletePmocOption(id) {
    const response = await api.delete(`/pmoc-option/${id}`);
    return { type: actionsTypes.DELETE_PMOC_OPTION, payload: response };
}
export async function showPmocOption(id) {
    const response = await api.get(`/pmoc-option/${id}`);
    return { type: actionsTypes.SHOW_PMOC_OPTION, payload: response };
}

/* Engineer */
export async function getCountEngineers(){
    const response = await api.get('/admin/count');
    return { type: actionsTypes.GET_COUNT_ENGINEER, payload: response.data };
}

export async function getEngineerStatistics() {
    const response = await api.get("/admin/engineer-statistic");
    return { type: actionsTypes.STATISTICS_ENGINEER, payload: response.data };
}