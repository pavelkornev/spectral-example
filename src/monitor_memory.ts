import { memoryUsage } from 'process';
import logUpdate from 'log-update';

export function printMemoryUsage(documentName: string, documentCounter: number, numberOfDocuments: number) {
    const memoryInfo = memoryUsage();

    logUpdate(`
Number of documents: ${documentCounter}/${numberOfDocuments} - Document: ${documentName}
Memory Usage:
- RSS: ${formatBytes(memoryInfo.rss)}
- Heap Total: ${formatBytes(memoryInfo.heapTotal)}
- Heap Used: ${formatBytes(memoryInfo.heapUsed)}
- External: ${formatBytes(memoryInfo.external)}
- Array Buffers: ${formatBytes(memoryInfo.arrayBuffers)}
`);
}

function formatBytes(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}
