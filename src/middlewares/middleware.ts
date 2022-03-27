import express, { Request, Response, NextFunction } from 'express';
import { errands } from '../datas/data';

export function verifyId (request: Request, response: Response, next: NextFunction) {
    const id = Math.floor(Math.random() * (100 - 1 + 1) + 1)

    if (errands.find(errand => errand.id === id)) {
        return response.status(400).json({
            mensagem: 'Recado já existe'
        })
    }

    next();
}

export function validateFields(request: Request, response: Response, next: NextFunction) {
    const { description, detailing } = request.body;

    if (!description || !detailing) {
        return response.status(400).json({
            mensagem: "Por favor, preencha todos os campos corretamente."
        })
    }
    next();
}

export function validateId (request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const errandId = errands.find(errand => errand.id === parseInt(id));
    
    if (!errandId) {
        return response.status(404).json({
            mensagem: 'Recado não encontrado'
        })
    }

   next();
}
