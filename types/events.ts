export interface Events {
  [key: string]: {
    message: string;
    line: number;
    prefix?: string | undefined;
    success?: boolean | undefined;
    failed?: boolean | undefined;
    indent?: number | undefined;
    start?: boolean | undefined;
  };
}
