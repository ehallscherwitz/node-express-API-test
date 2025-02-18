import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import Joi from 'joi';
import { Validate } from '../decorators/validate';

const postHealthCHeckValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email()
});

@Controller()
class MainController {
    @Route('get', '/healthcheck')
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        logging.info('Healthcheck called successfully!');
        res.status(200).send('Success');
    }

    @Route('post', '/healthcheck')
    @Validate(postHealthCHeckValidation)
    postHealthCheck(req: Request, res: Response, next: NextFunction) {
        logging.info('Healthcheck called successfully!');
        res.status(200).send({ ...req.body });
    }
}

export default MainController;
