import { Request, Response } from 'express';
import Map from '../models/maps'; 

// Obtener todos los mapas
export const getMaps = async (req: Request, res: Response) => {
    try {
        console.log("Intentando obtener mapas...");
        console.log("Modelo Map:", Map);
        const maps = await Map.find();
        console.log("Mapas encontrados:", maps);
        res.status(200).json(maps);
    } catch (error) {
        console.error("Error al obtener los mapas:", error);
        res.status(500).json({ message: 'Error retrieving maps', error });
    }
};

// Obtener un mapa por ID
export const getMapById = async (req: Request, res: Response) => {
    try {
        const map = await Map.findById(req.params.id);
        if (!map) {
            res.status(404).json({ message: 'Map not found' });
        }
        res.status(200).json(map);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving map', error });
    }
};

// Crear un nuevo mapa
export const createMap = async (req: Request, res: Response) => {
    try {
        const { title, subtitle, start, end, description, lat, lng } = req.body;

        const newMap = new Map({
            title,
            subtitle,
            start,
            end,
            description,
            lat,
            lng
        });

        const savedMap = await newMap.save();
        res.status(201).json(savedMap);
    } catch (error) {
        console.error("Error al crear el mapa:", error);  
        res.status(500).json({ message: "Error creando el mapa", error });
    }
};

// Actualizar un mapa por ID
export const updateMap = async (req: Request, res: Response) => {
    try {
        const updatedMap = await Map.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMap) {
            res.status(404).json({ message: 'Map not found' });
        }
        res.status(200).json(updatedMap);
    } catch (error) {
        res.status(500).json({ message: 'Error updating map', error });
    }
};

// Eliminar un mapa por ID
export const deleteMap = async (req: Request, res: Response) => {
    try {
        const deletedMap = await Map.findByIdAndDelete(req.params.id);
        if (!deletedMap) {
            res.status(404).json({ message: 'Map not found' });
        }
        res.status(200).json({ message: 'Map deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting map', error });
    }
};
