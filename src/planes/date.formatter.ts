import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import * as dayjs from 'dayjs';

const localizedFormat = require('dayjs/plugin/localizedFormat')


dayjs.extend(localizedFormat);
dayjs().format('L LT');

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: string): any {
    return dayjs(value);
  }

  serialize(value: string): string {
    return dayjs(value).format('llll');
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
