import { DynamicModule, Global, Module } from '@nestjs/common';

import {
  HtmlTemplateOptions,
  EMAIL_TEMPLATE_OPTIONS,
} from './html-template.const';
import { HtmlTemplateService } from './html-template.service';

@Global()
@Module({
  providers: [HtmlTemplateService],
  exports: [HtmlTemplateService],
})
export class HtmlTemplateModule {
  static register(options: HtmlTemplateOptions): DynamicModule {
    return {
      module: HtmlTemplateModule,
      providers: [
        {
          provide: EMAIL_TEMPLATE_OPTIONS,
          useValue: options,
        },
        HtmlTemplateService,
      ],
      exports: [HtmlTemplateService],
    };
  }
}
