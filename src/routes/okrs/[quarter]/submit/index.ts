import type { RequestHandlerOutput } from '@sveltejs/kit';
import type { Collection, MongoClient } from 'mongodb';
import clientPromise from '../../../../db';

export async function get({ params }): Promise<RequestHandlerOutput> {
	try {
		const client: MongoClient = await clientPromise;
		const okrsCollection: Collection = client.db('rankedVoting').collection('submissons');
		const quarter = params.quarter;
		const okrs = await okrsCollection
			// .find().toArray();
			.aggregate([
				{
					$match: { quarter: quarter }
				},
				{
					$group: { _id: '$kr', averageScore: { $avg: '$value' } }
				}
			])
			.toArray();
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

export async function post({ request }): Promise<RequestHandlerOutput> {
	try {
		const client: MongoClient = await clientPromise;
		const submissionsCollection: Collection = client.db('rankedVoting').collection('submissons');
		const submissionData = await request.json();
		await submissionsCollection.insertMany(submissionData);
		return {
			status: 200,
			body: {
				status: 'Success'
			}
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			body: {
				error: 'Server Error'
			}
		};
	}
}
