import {Pipe, PipeTransform} from "@angular/core";

// 파이프 이름을 temperature로 지정. 컴포넌트 템플릿에서는 이 이름으로 커스텀 파이프 사용
@Pipe({name: 'temperature'})
export class TemperaturePipe implements PipeTransform {
  transform(value: any, fromTo: string): any {
    if (!fromTo) {
      throw 'Temperature pipe requires parameter FtoC or CtoF';
    }

    return (fromTo === 'FtoC') ?
        (value - 32) * 5.0 / 9.0 : // F to C
        value * 9.0 / 5.0 + 32;    // C to F
  }
}