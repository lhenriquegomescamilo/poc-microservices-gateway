/// <reference types="webpack-env" />

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

declare const module: any;
const port = 3000;

async function bootstrap() {
    const showServerIsRunning = (p: number) => () => console.log(`Gateway server is listening with HMR enabled on port ${p}`);
    const app = await NestFactory.create(AppModule);
    await app
        .listen(port, showServerIsRunning(port));

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
