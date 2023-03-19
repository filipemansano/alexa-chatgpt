import { google } from "googleapis";
import { Endpoint } from 'googleapis-common';

interface AnalyzeResponse {
	data: {
		attributeScores: {
			TOXICITY: {
				summaryScore: {
					value: number;
				};
			};
		};
	};
}

interface AnalyzeComments {
	analyze(
		params: {
			key: string;
			resource: {
				comment: {
					text: string;
				};
				requestedAttributes: {
					TOXICITY: {};
				};
			};
		},
		callback?: (
			err: Error | null,
			response: AnalyzeResponse | null
		) => void
	): Promise<AnalyzeResponse>;
}

export async function getClient() {
	return google.discoverAPI(
		'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1'
	);
}

export async function analyzeText(text: string, client?: Readonly<Endpoint>): Promise<number> {

	if(client === undefined || client === null){
		client = await getClient();
	}

	const analyzeRequest = {
		comment: {
			text: text
		},
		requestedAttributes: {
			TOXICITY: {}
		}
	};

	const response = await (client.comments as AnalyzeComments).analyze({
		key: process.env.GOOGLE_API_KEY,
		resource: analyzeRequest
	});

	return response.data.attributeScores.TOXICITY.summaryScore.value;
}