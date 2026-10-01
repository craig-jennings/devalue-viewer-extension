import { parse } from 'devalue';

const remoteArgRevivers: Record<string, (value: unknown) => unknown> = {
	__skrao: (value: unknown) => value,
	__skram: (value: unknown) => {
		if (!Array.isArray(value)) return value;

		return new Map(
			value.map((item) => {
				if (!Array.isArray(item) || item.length !== 2) return item as [unknown, unknown];

				return [parseValue(item[0]), parseValue(item[1])];
			}),
		);
	},
	__skras: (value: unknown) => {
		if (!Array.isArray(value)) return value;

		return new Set(value.map((item) => parseValue(item)));
	},
	__skraf: (value: unknown) => value,
};

function parseValue(value: unknown) {
	if (typeof value !== 'string') return value;

	return parse(value, remoteArgRevivers);
}

function decodeBase64(value: string) {
	const normalized = value.replaceAll('-', '+').replaceAll('_', '/');

	return decodeURIComponent(
		[...atob(normalized)].map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''),
	);
}

export function parseDevalue(value: unknown) {
	if (typeof value !== 'string') return value;

	try {
		return parse(value, remoteArgRevivers);
	} catch {
		try {
			return parse(decodeBase64(value), remoteArgRevivers);
		} catch {
			return value;
		}
	}
}
