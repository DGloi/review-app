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