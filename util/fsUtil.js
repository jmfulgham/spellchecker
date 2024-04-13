import { readFile } from 'node:fs/promises';
import fs from "fs";
export const getDictionaryContents = (dictionaryFile) => fs.readFileSync(dictionaryFile, {encoding: 'utf8'}, (err, data) => {
    if (err) console.error(err)
    return formatData(data);
})

export const getFileToCheckContents = async(fileToCheck) => {
    try{
        const data = await readFile(fileToCheck, { encoding: 'utf8' });
        return formatData(data)
    } catch(e){
        console.log(e)
    }
}

export const formatData = (data) => {
    return data.toLowerCase().replace(/[^\w\s]/g, '').replace(/[0-9]/g, '').split('\n');
}