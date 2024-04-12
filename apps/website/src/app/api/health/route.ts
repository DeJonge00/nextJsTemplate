import { existsSync, readFileSync } from 'fs';
import { NextRequest } from 'next/server';

import { apiWrapper } from '@website/utils/server';

const VERSION_APP_FILE = '../../../version.app.json';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    return (
        await apiWrapper({
            name: 'health',
            api: health,
            methods: new Set(['GET']),
        })
    )(req);
}

async function health() {
    const status = getStatus();
    const version = getVersion();

    return {
        body: {
            appVersion: version,
            isHealthy: true,
        },
        status,
    };
}

function getVersion() {
    const currentVersion = existsSync(VERSION_APP_FILE)
        ? JSON.parse(readFileSync(VERSION_APP_FILE).toString('utf8').trim())
              .version
        : 'DEV';
    return currentVersion;
}

function getStatus() {
    return 200;
}
