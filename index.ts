const AWS = require('aws-sdk');

interface DynamongoOptions {
	isVerbose?: boolean,
	timestampsEnabled?: boolean,
	timestampCreatedField?: string,
	timestampUpdatedField?: string
}

interface DynamongoExpression {
	data: string,
	values: object,
	names: object
}

class Dynamongo {
	
	/* Optional Singleton Usage */
	private static _Instance = null;

	public static getInstance() {
		if (Dynamongo._Instance == null) {
			// @ts-ignore
			Dynamongo._Instance = new Dynamongo(...arguments);
		}

		return Dynamongo._Instance;
	}

	private _connection = null;
	private _isVerbose = false;
	private _timestampsEnabled = false;
	private _timestampCreatedField = 'createdAt';
	private _timestampUpdatedField = 'updatedAt';

	constructor(region, options: DynamongoOptions) {
		options = options || {};

		if (region) {
			AWS.config.update({ region });
		}

		this._connection = new AWS.DynamoDB.DocumentClient();
		this._isVerbose = options.isVerbose;
		this._timestampsEnabled = options.timestampsEnabled;
		this._timestampCreatedField = options.timestampCreatedField;
		this._timestampUpdatedField = options.timestampUpdatedField;
	}

	public getConnection() {
		return this._connection;
	}

	private _log(...args): void {
		this._isVerbose && console.log('Dynamongo: ', ...args);
	}

	async getWhere(table: string, where: object) {
		const expression = this._generateExpression(where, 'AND');

		const params = {
			TableName: table,
			FilterExpression: expression.data,
			ExpressionAttributeValues: expression.values,
			ExpressionAttributeNames: expression.names
		};

		this._log('getWhere()', params);
		return await this._connection.scan(params).promise();
	}

	_generateExpression(data: object, expressionSeparator: string): DynamongoExpression  {
		const expressionData = [];
		const expressionAttributeValues = {};
		const expressionAttributeNames = {};

		Object.keys(data).forEach((key, index) => {
			key = key.replace(/[^A-Za-z]/gi, '');

			expressionData.push(`#${index} = :val${index}`);
			expressionAttributeValues[`:val${index}`] = data[key];
			expressionAttributeNames[`#${index}`] = key;
		});

		return {
			data: expressionData.join(` ${expressionSeparator} `),
			values: expressionAttributeValues,
			names: expressionAttributeNames
		}
	}

	async insert(table: string, data: object) : Promise<object> {
		const params = {
			TableName: table,
			Item: data
		};

		if (this._timestampsEnabled) {
			params.Item[this._timestampCreatedField] = Date.now();
		}

		this._log('insert()', params);
		return await this._connection.put(params).promise();
	}

	async getByKey(table: string, keys: object): Promise<object> {
		const params = {
			TableName: table,
			Key: keys
		};

		this._log('getByKey()', params);
		return await this._connection.get(params).promise();
	}

	async updateByKey(table: string, keys: object, data: object): Promise<object>{
		if (this._timestampsEnabled) {
			data[this._timestampUpdatedField] = Date.now();
		}

		const expression = this._generateExpression(data, ',');
		
		const params = {
			TableName: table,
			Key: keys,
			UpdateExpression: `SET ${expression.data}`,
			ExpressionAttributeValues: expression.values,
			ExpressionAttributeNames: expression.names,
			ReturnValues: "UPDATED_NEW"
		};

		this._log('updateByKey()', params);
		return await this._connection.update(params).promise();
	}

	async deleteByKey(table: string, keys: object): Promise<object>{
		const params = {
			TableName: table,
			Key: keys
		};

		this._log('deleteByKey()', params);
		return await this._connection.delete(params).promise();
	}

}

module.exports = Dynamongo;