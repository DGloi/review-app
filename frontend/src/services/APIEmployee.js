import axios from 'axios';
import { uriSerialized } from "utils/uriSerialized"

export const getEmployeeTable = async (queryOptions = null) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
        const request = await axios({
            method: "GET",
            url: `http://localhost:8000/employee/${query}`,
        })
        const response = request.data
        return response
    } catch (error) {
        console.log(`getEmployeeTable error: ${error}`)
        return false
    }
}

export const deleteEmployee = async (id, onSuccess, onError) => {
    try {
        const response = await axios.delete(`http://localhost:8000/employee/${id}/`);
        onSuccess(); // Call the success callback to trigger data refresh
        return response.data;
    } catch (error) {
        console.error(`deleteEmployee error: ${error}`);
        onError(); // Call the error callback if deletion fails
        throw new Error('Error deleting employee');
    }
};

