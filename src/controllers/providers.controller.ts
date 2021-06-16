import express from 'express';
import multer from 'multer';
import * as csv from 'fast-csv';
import { ResponseHandler } from '../utils/response-handler';
import { CarService } from '../services';
import * as fs from 'fs';
import { Logger } from '../utils/logger';
import { parseObjectKeysToCamelCase } from '../utils/parser';
import { IUploadRowInterface } from '../interfaces/IUploadRow.interface';

export class ProvidersController {
    private multer;
    public basePath = '/providers';
    public router = express.Router();

    constructor() {
        this.multer = multer({ dest: '../_temp_uploads' });
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.post(`${this.basePath}/upload`, this.multer.any(), this.upload);
    }

    async upload(req: express.Request, res: express.Response) {
        try {
            const files = req.files as Express.Multer.File[];

            if (!files.length) {
                return ResponseHandler.badRequest(res, null, 'missing fields');
            }

            const file = files?.find((x: Express.Multer.File) => x.fieldname === 'autofi_csv');

            if (!file) {
                return ResponseHandler.badRequest(res, null, "Missing required field called 'autofi_csv'");
            }

            if (file.mimetype !== 'text/csv') {
                return ResponseHandler.badRequest(res, null, 'Only CSV allowed');
            }

            const rowCars: IUploadRowInterface[] = [];

            let skips = 0;
            fs.createReadStream(file.path)
                .pipe(csv.parse({ headers: true }))
                .on('data', (row: any) => {
                    const formattedRow = parseObjectKeysToCamelCase(row) as IUploadRowInterface;
                    if (formattedRow.uuid) {
                        rowCars.push(formattedRow);
                    } else {
                        skips++;
                        Logger.debug('Skipping row, UUID missing');
                    }
                })
                .on('error', (error) => {
                    throw new Error(`Error processing the CSV: ${error.message}`);
                })
                .on('end', async () => {
                    const cardService = new CarService();

                    let completedUpserts = 0;
                    for await (const car of rowCars) {
                        Logger.debug('Upsert car to the db...');
                        await cardService.findOneAndUpdate({ uuid: car.uuid }, { ...car }, { upsert: true });
                        completedUpserts++;
                        Logger.success(`Inserts/Updates ${completedUpserts} of ${rowCars.length}`);
                    }

                    fs.unlinkSync(file.path);
                    Logger.success(
                        `Upsert CSV process finished, cars inserted/updated ${completedUpserts}, skipped rows: ${skips}`,
                    );
                });

            return ResponseHandler.ok(res);
        } catch (e) {
            return ResponseHandler.serverError(res, null, e.message);
        }
    }
}
