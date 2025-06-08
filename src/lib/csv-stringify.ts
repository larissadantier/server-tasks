import { stringify } from 'csv-stringify/sync';

type StringifyOpts = Parameters<typeof stringify>[1];

export function generateCSV<T extends Record<string, any>>(
  records: T[],
  opts: StringifyOpts = {}
): string { 
  const headerUTF = '\uFEFF';

  const body = stringify(records, {
    header: true,
    delimiter: ';',
    ...opts,
  })

  return headerUTF + body;
}