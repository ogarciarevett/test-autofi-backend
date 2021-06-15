import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';

export abstract class BaseModel {
    _id?: Types.ObjectId;

    createdAt?: Readonly<Date>;
    updatedAt?: Readonly<Date>;

    @prop({ default: -1 })
    deletedAt?: number = -1;
}
