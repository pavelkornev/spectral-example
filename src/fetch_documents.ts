import axios, { AxiosResponse, AxiosError } from 'axios';
var url = require('url');
const fs = require('fs');
const path = require('path');

const apiUrl = 'https://api.sap.com/api/1.0/container/API/artifacts?containerType=contentType&$filter=Type%20eq%20%27API%27%20or%20Type%20eq%20%27PolicyTemplate%27&$orderby=DisplayName%20asc&$top=1000';
const tempFolder = './_documents';

async function main() {
    const res = await axios.get(apiUrl);
    const documentList = res.data;
    const documentLength = documentList.length;
    let documentCounter = 0;
    for (const document of documentList) {
        try {
            const documentName = document.Name;
            const documentUrl = `https://api.sap.com/odata/1.0/catalog.svc/APIContent.APIs(%27${documentName}%27)/$value?type=json`;
            const documentData = await fetchDocument(documentUrl);
            const documentContent = JSON.stringify(documentData, null, 2);
            const documentPath = path.join(__dirname, `${tempFolder}/${documentName}.json`);
            fs.mkdirSync(path.join(__dirname, tempFolder), { recursive: true });
            if (typeof documentContent != 'string' || documentContent.length <= 0) {
                console.error(`Document content is too short: ${documentName}`);
                continue;
            }
            writeDocument(documentPath, documentContent);
            documentCounter++;
        } catch (error) {
            console.error(`Error fetching document: ${error}, documentName: ${document.Name}`);
        }
    }
    console.log(`Fetched ${documentCounter} documents out of ${documentLength}`);
}

async function fetchDocument(documentUrl: string) {
    try {
        const response = await axios.get(documentUrl);
        return response.data;
    } catch (error) {
        console.error(`Error fetching document: ${error}, url: ${documentUrl}`);
    }
}

async function writeDocument(documentPath: string, documentContent: string) {
    fs.writeFileSync(documentPath, documentContent, function(err: any) {
        if (err) {
            throw err;
        }
        console.log('complete');
        }
    );
    console.log(`Fetch document: ${documentPath}`);
}

main();
