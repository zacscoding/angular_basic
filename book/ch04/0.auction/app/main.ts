import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

// 부트스트랩 :: 모듈을 브라우저에 로드
platformBrowserDynamic().bootstrapModule(AppModule);