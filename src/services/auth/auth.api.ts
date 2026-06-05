import { api } from '../api/api';
import { ENDPOINTS } from '../api/endpoint';
import {
    registerRequest,
    registerResponse
} from '../api/types';

export const register = (
    payload: registerRequest
) => {
    return api.post<registerResponse, registerRequest>(
        ENDPOINTS.AUTH.REGISTER,
        payload
    );
};