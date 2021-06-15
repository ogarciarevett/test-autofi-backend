import { Ref, getName, getModelForClass } from '@typegoose/typegoose';
import { AnyParamConstructor, ModelType } from '@typegoose/typegoose/lib/types';
import { FilterQuery, ModelUpdateOptions, UpdateQuery } from 'mongoose';
import { BaseModel } from "../models/base.model";

export type Id<Document extends BaseModel> = string | Ref<Document>;

export interface ResourceServiceOptions<
    Document extends BaseModel,
    ClassDocument extends AnyParamConstructor<Document>
    > {
    document: ClassDocument;
}

export abstract class BaseService<Document extends BaseModel, ClassDocument extends AnyParamConstructor<Document>> {
    protected readonly document: ClassDocument;
    protected readonly model: ModelType<InstanceType<ClassDocument>> & ClassDocument;

    protected constructor(options: ResourceServiceOptions<Document, ClassDocument>) {
        const { document } = options;
        this.document = document;

        this.model = getModelForClass(document);
    }

    checkIfModel(item: any) {
        return item instanceof this.model;
    }

    async getById(id: Id<Document>, query: FilterQuery<Document> = {}) {
        const data = await this.model.findOne({ ...query, _id: id } as FilterQuery<any>);
        if (!data) {
            throw new Error(`[${getName(this.model)}]: ${id} not found!`);
        }
        return data;
    }

    findById(id: Id<Document>) {
        return this.model.findById(id);
    }

    findAll(query: FilterQuery<Document>) {
        return this.model.find(query as any);
    }

    findOne(query: FilterQuery<Document>) {
        return this.model.findOne(query as any);
    }

    get(id: Id<Document>) {
        return this.model
            .findOne({ _id: id } as any)
            .lean(true)
            .exec();
    }

    getAll(query: FilterQuery<Document> = {}, sort?: object) {
        return this.model
            .find(query as any)
            .sort(sort)
            .exec();
    }

    create(data: Document) {
        return this.model.create(data as any);
    }

    update(id: Id<Document>, data: UpdateQuery<Document>, params?: object) {
        return this.model.findOneAndUpdate({ _id: id } as any, data as any, { new: true, ...params }).exec();
    }

    updateMany(query: FilterQuery<Document>, data: UpdateQuery<Document>) {
        return this.model.updateMany(query as any, data as any).exec();
    }

    updateByQuery(query: FilterQuery<Document>, patch: UpdateQuery<Document>) {
        return this.model.findOneAndUpdate(query as any, patch as any).exec();
    }

    findOneAndUpdate(query: Partial<Document>, data: UpdateQuery<Document>, params?: object) {
        return this.model.findOneAndUpdate(query as any, data as any, { ...params }).exec();
    }

    patch(id: Id<Document>, data: UpdateQuery<Document>, params?: Record<string, unknown>) {
        return this.model.findOneAndUpdate({ _id: id } as any, data as any, { new: true, ...params }).exec();
    }

    // TODO: add support for soft deletion
    delete(id: Id<Document>) {
        return this.model.findByIdAndDelete(id).exec();
    }

    deleteByQuery(query: FilterQuery<Document>) {
        return this.model.findOneAndRemove(query as any).exec();
    }

    deleteMany(query: FilterQuery<Document>) {
        return this.model.deleteMany(query as any).exec();
    }

    countByQuery(query: FilterQuery<Document>): Promise<number> {
        return this.model.countDocuments(query as any).exec();
    }

    aggregate(query: any[]) {
        return this.model.aggregate(query);
    }

    updateOne(query: FilterQuery<Document>, data: UpdateQuery<Document>, options: ModelUpdateOptions = {}) {
        return this.model.updateOne(query as any, data as any, options);
    }
}
