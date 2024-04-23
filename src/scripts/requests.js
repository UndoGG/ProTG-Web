import settings from "@/settings.js";
import axios from "axios";

export async function request(endpoint_or_full_url, method=null, auth=null, data=null) {
    let endpoint

    if (endpoint_or_full_url.startsWith('http')) {
        endpoint = endpoint_or_full_url
    }
    else {
        endpoint = settings.backend_base + endpoint_or_full_url
    }

    let config = {}
    if (auth != null) {
        config['headers'] = {
            'Authorization': `Bearer ${auth}`
        }
    }

    if (data == null) {
        data = {}
    }

    try {
        let response;

        if (method === 'post') {
            response = await axios.post(endpoint, data, config);
        } else if (method === 'put') {
            response = await axios.put(endpoint, data, config);
        } else if (method === 'patch') {
            response = await axios.patch(endpoint, data, config);
        } else if (method === 'delete') {
            response = await axios.delete(endpoint, config);
        } else {
            response = await axios.get(endpoint, config);
        }

        return response;
        } catch (error) {
            // Если произошла сетевая ошибка, например, connection refused
            if (error.code === 'ERR_NETWORK') {
                return { response: { status: 503, data: { detail: 'Server is offline' } } };
            }

            // Если есть другие ошибки с объектом response
            if (error.response) {
                return error;
            }

            // Если ошибка не имеет объекта response и это не сетевая ошибка
            return { error: 'Unknown Error' };
        }
}
