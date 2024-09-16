export class Logger {
    static log(message: string): void {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }

    static error(message: string): void {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] ERROR: ${message}`);
    }

    static info(message: string): void {
        const timestamp = new Date().toISOString();
        console.info(`[${timestamp}] INFO: ${message}`);
    }
}
