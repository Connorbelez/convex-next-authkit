import pino from 'pino';

const DEFAULT_SERVICE = process.env.LOG_SERVICE_NAME || 'convex-next-authkit';
const LOG_PRETTY = process.env.LOG_PRETTY === 'true' || process.env.NODE_ENV !== 'production';
const LOG_LEVEL = (process.env.LOG_LEVEL || 'info') as pino.Level;

function levelToEmoji(levelNum: number) {
    switch (levelNum) {
        case 10:
            return '🔍';
        case 20:
            return '🐞';
        case 30:
            return 'ℹ️';
        case 40:
            return '⚠️';
        case 50:
            return '🔥';
        case 60:
            return '💀';
        default:
            return '';
    }
}

export function createPinoAdapter() {
    let instance: pino.Logger;

    try {
        if (LOG_PRETTY) {
            // Use a transport with pino-pretty for developer-friendly console output.
            // pino.transport is available in pino v7+; if unavailable this will throw and we'll fall back.
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const transport = pino.transport({
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    ignore: 'pid,hostname',
                    translateTime: 'SYS:standard',
                    singleLine: false,
                    messageFormat: (log: any, messageKey: string) => {
                        const emoji = levelToEmoji(log.level);
                        const msg = log[messageKey] ?? '';
                        // include error stack if present
                        const maybeErr = log.err ? `\n${log.err.stack || JSON.stringify(log.err)}` : '';
                        // include additional fields excluding msg and level
                        const meta = Object.keys(log).filter(k => ![messageKey, 'level', 'time', 'err'].includes(k)).length
                            ? ` ${JSON.stringify(Object.fromEntries(Object.entries(log).filter(([k]) => ![messageKey, 'level', 'time', 'err'].includes(k))))}`
                            : '';
                        return `${emoji} ${msg}${maybeErr}${meta}`;
                    }
                }
            });
            instance = pino({ level: LOG_LEVEL, base: { service: DEFAULT_SERVICE }, timestamp: pino.stdTimeFunctions.isoTime }, transport);
        } else {
            instance = pino({ level: LOG_LEVEL, base: { service: DEFAULT_SERVICE }, timestamp: pino.stdTimeFunctions.isoTime });
        }
    } catch (err) {
        // If transport or pino-pretty isn't available for some reason, fall back to a plain pino instance.
        instance = pino({ level: LOG_LEVEL, base: { service: DEFAULT_SERVICE }, timestamp: pino.stdTimeFunctions.isoTime });
    }

    const adapter = {
        trace: (msg: string | Error, meta?: Record<string, any>) => {
            if (msg instanceof Error) instance.trace({ err: msg, ...meta }, msg.message);
            else instance.trace({ ...meta }, msg);
        },
        debug: (msg: string | Error, meta?: Record<string, any>) => {
            if (msg instanceof Error) instance.debug({ err: msg, ...meta }, msg.message);
            else instance.debug({ ...meta }, msg);
        },
        info: (msg: string | Error, meta?: Record<string, any>) => {
            if (msg instanceof Error) instance.info({ err: msg, ...meta }, msg.message);
            else instance.info({ ...meta }, msg);
        },
        warn: (msg: string | Error, meta?: Record<string, any>) => {
            if (msg instanceof Error) instance.warn({ err: msg, ...meta }, msg.message);
            else instance.warn({ ...meta }, msg);
        },
        error: (msg: string | Error, meta?: Record<string, any>) => {
            if (msg instanceof Error) instance.error({ err: msg, ...meta }, msg.message);
            else instance.error({ ...meta }, msg);
        },
        child: (ctx: Record<string, any>) => {
            const child = instance.child(ctx);
            return {
                trace: (m: string | Error, meta?: Record<string, any>) => { if (m instanceof Error) child.trace({ err: m, ...meta }, m.message); else child.trace({ ...meta }, m); },
                debug: (m: string | Error, meta?: Record<string, any>) => { if (m instanceof Error) child.debug({ err: m, ...meta }, m.message); else child.debug({ ...meta }, m); },
                info: (m: string | Error, meta?: Record<string, any>) => { if (m instanceof Error) child.info({ err: m, ...meta }, m.message); else child.info({ ...meta }, m); },
                warn: (m: string | Error, meta?: Record<string, any>) => { if (m instanceof Error) child.warn({ err: m, ...meta }, m.message); else child.warn({ ...meta }, m); },
                error: (m: string | Error, meta?: Record<string, any>) => { if (m instanceof Error) child.error({ err: m, ...meta }, m.message); else child.error({ ...meta }, m); },
                child: (c: Record<string, any>) => adapter.child({ ...ctx, ...c }),
            };
        }
    };

    return adapter;
}

export default createPinoAdapter;
