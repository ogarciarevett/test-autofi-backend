import { modelOptions, prop } from '@typegoose/typegoose';

import { BaseModel } from './base.model';

@modelOptions({
    schemaOptions: {
        collection: 'cards',
        timestamps: true,
        strict: false,
    },
})
export class CarModel extends BaseModel {
    @prop()
    vin?: string;

    @prop()
    uuid: string;

    @prop({ required: true })
    make: string;

    @prop({ required: true })
    model: string;

    @prop({ required: true })
    mileage: number;

    @prop({ required: true })
    year: number;

    @prop({ required: true })
    price: number;

    @prop({ required: true })
    zipCode: string;
}
