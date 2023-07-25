import useSWR from "swr";

export default function useCustomSWR(key: string, fetcher?: (args: any) => any, options?: any) {
	if(!fetcher) fetcher = (...args) => fetch(...args).then(res => res.json());

	return useSWR(key, fetcher, options);
}