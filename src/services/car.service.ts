import { BaseService } from "./base.service";
import { CarModel } from "../models";

export class CarService extends BaseService<CarModel, typeof CarModel>{

    constructor() {
        super({
            document: CarModel
        });
    }
}
