import { agent as request } from 'supertest';
import { expect } from 'chai';
// @ts-ignore
import path from 'path';
import app from '../../src';

describe('ProviderController Test', () => {
    it('should POST /api/v1/providers/upload returns 200 and the file is the correct one', async () => {
        const res = await request(app)
            .post('/api/v1/providers/upload')
            .attach('autofi_csv', path.join(__dirname, '../', 'files/csv-cars-providers.csv'));

        expect(res?.status).to.equal(200);
    });

    it('should POST /api/v1/providers/upload returns 400 if the key of the form-field is incorrect', async () => {
        const res = await request(app)
            .post('/api/v1/providers/upload')
            .attach('asndoaasdja_asdas', path.join(__dirname, '../', 'files/csv-cars-providers.csv'));

        expect(res?.status).to.equal(400);
    });

    it('should POST /api/v1/providers/upload returns 400 if the file extension is incorrect', async () => {
        const res = await request(app)
            .post('/api/v1/providers/upload')
            .attach('asndoaasdja_asdas', path.join(__dirname, '../', 'files/csv-cars-providers.failing_extension'));

        expect(res?.status).to.equal(400);
    });
});
