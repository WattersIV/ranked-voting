import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import type { Collection, Db, MongoClient } from 'mongodb';
import clientPromise from '../../db';

export async function post({ request }): Promise<RequestHandlerOutput> {
	try {
		const client: MongoClient = await clientPromise;
		const okrsCollection: Collection = client.db('rankedVoting').collection('okrs');
		const okrsData = await request.json();
		await okrsCollection.insertMany(okrsData);
		return {
			status: 200,
			body: {
				status: 'Success'
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				error: 'Server Error'
			}
		};
	}
}
