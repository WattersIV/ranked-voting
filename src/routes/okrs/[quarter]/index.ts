import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import type { Collection, Db, MongoClient } from 'mongodb';
import clientPromise from '../../../db';

export async function get({ params }): Promise<RequestHandlerOutput> {
	try {
		const client: MongoClient = await clientPromise;
		const okrsCollection: Collection = client.db('rankedVoting').collection('okrs');
		const quarter = params.quarter;
		const okrs = await okrsCollection.find({ quarter: { $eq: quarter } }).toArray();
		return {
			status: 200,
			body: {
				okrs
			}
		};
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			body: {
				error: 'Server Error'
			}
		};
	}
}
