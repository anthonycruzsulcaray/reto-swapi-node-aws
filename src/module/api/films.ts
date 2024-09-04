import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class FilmsApiRest {

    async listAll(): Promise<any> {
        try {
            const response = await axios.get(`${process.env.API_URL_BASE}films`, {
                headers: {
                    'Content-Type': "application/json"
                },
                maxBodyLength: Infinity,
            });
            return response.data;
        } catch (error) {
            console.log("Error al consumir api - films: " + error);
            throw error; 
        }
    }

    async listById(id: number): Promise<any> {
        try {
            const response = await axios.get(`${process.env.API_URL_BASE}films/${id}`, {
                headers: {
                    'Content-Type': "application/json"
                },
                maxBodyLength: Infinity,
            });
            return response.data; 
        } catch (error) {
            console.log("Error al consumir api - films: " + error);
            throw error;
        }
    }
}
