/* eslint-disable @typescript-eslint/no-explicit-any */
export function toQueryString(obj: any): string {
  return Object.entries(obj)
    .flatMap(([key, value]: [string, any]) => {
      if (Array.isArray(value)) {
        return value.map(
          (val: string) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
        );
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
}
