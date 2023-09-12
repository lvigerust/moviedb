// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			request_token: {
				status_message: string
				request_token: string
				success: boolean
				status_code: number
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
