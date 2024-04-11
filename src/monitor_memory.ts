import { memoryUsage } from 'process';

export function printMemoryUsage() {
    const memoryInfo = memoryUsage();

    console.log('Memory Usage:');
    console.log(`  - RSS: ${formatBytes(memoryInfo.rss)}`);
    console.log(`  - Heap Total: ${formatBytes(memoryInfo.heapTotal)}`);
    console.log(`  - Heap Used: ${formatBytes(memoryInfo.heapUsed)}`);
    console.log(`  - External: ${formatBytes(memoryInfo.external)}`);
    console.log(`  - Array Buffers: ${formatBytes(memoryInfo.arrayBuffers)}`);
}

function formatBytes(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

setInterval(printMemoryUsage, 1000);
