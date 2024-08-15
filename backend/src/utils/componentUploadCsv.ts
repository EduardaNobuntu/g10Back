import csv from 'csvtojson';
import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');
  
export async function uploadFile(req: Request, res: Response, next: NextFunction){
    upload(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};

export async function parseCsv(filePath: string)  {
    //return await csv({header: true}).fromFile(filePath);
};

export async function saveRecords(records: any, saveFunction: any) {
    const savedRecords = [];
    for (const record of records) {
        const savedRecord = await saveFunction(record);
        if (savedRecord) {
            savedRecords.push(savedRecord);
        }
    }
    return savedRecords;
};

