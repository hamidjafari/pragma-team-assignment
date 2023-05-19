export enum ApiCacheKeys {
	GET_RESERVATION_OF_DAY = "GET_RESERVATION_OF_DAY",
}

export type GetMethod<T> = {
	(...args: any[]): Promise<T>;
	uniqueKey: ApiCacheKeys;
};
