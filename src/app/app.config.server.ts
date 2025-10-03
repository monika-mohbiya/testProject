// import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
// import { provideServerRendering } from '@angular/platform-server';
// import { provideServerRouting } from '@angular/ssr';
// import { appConfig } from './app.config';
// import { serverRoutes } from './app.routes.server';

// const serverConfig: ApplicationConfig = {
//   providers: [
//     provideServerRendering(),
//     provideServerRouting(serverRoutes)
//   ]
// };

// export const config = mergeApplicationConfig(appConfig, serverConfig);
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';

// export default bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...appConfig.providers,
//     provideServerRendering()
//   ]
// });

const serverConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideServerRendering()
  ]
}
export const config = mergeApplicationConfig(appConfig, serverConfig);