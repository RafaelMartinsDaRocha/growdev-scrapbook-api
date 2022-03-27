import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errands } from '../datas/data';
import { validateFields, validateId, verifyId } from '../middlewares/middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/errands', (request: Request, response: Response) => {
    return response.status(200).json(errands);
})


app.post('/errands', verifyId, validateFields, (request: Request, response: Response) => {
    const { description, detailing } = request.body;
    const id = Math.floor(Math.random() * (100 - 1 + 1) + 1)

    const errand = {
        id: id,
        description,
        detailing
    }

    errands.push(errand);

    return response.status(201).json(errands);
})



app.put('/errands/:id', validateId, validateFields, (request: Request, response: Response) => {
    const { id } = request.params;
    const { description, detailing } = request.body;
    
    const errand = errands.find(errand => errand.id === parseInt(id));

    if (errand){
        errand.description = description;
        errand.detailing = detailing
    }

    return response.status(200).json(errands);
})

app.delete('/errands/:id', validateId, (request: Request, response: Response) => {
    const { id } = request.params;

    const errandIndex = errands.findIndex(errand => errand.id === parseInt(id))

    errands.splice(errandIndex, 1);

    return response.status(200).json(errands);
})

app.listen(process.env.PORT || 8080, () => {
    console.log('API rodando...')
})




