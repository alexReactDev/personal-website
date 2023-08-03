export function mockFetchImplementation(value: any) {
	return () => {
		return Promise.resolve({
			json: () => Promise.resolve(value)
		})
	}
}

export function mockFetchResult(value: any) {
	return Promise.resolve({
		json: () => Promise.resolve(value)
	})
}