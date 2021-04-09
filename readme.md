[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache-2.0 License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<br />
<p align="center">
  <h1 align="center">DynaMongo</h1>
  <h2 align="center">
    A simple library for easy querying of DynamoDB using MongoDB-style object queries
  </h2>
  <h3 align="center">
    Forget about expression filters and conditions.
  </h3>
</p>

## About The Project

Coming from MongoDB and moving towards DynamoDB, there are some abstractions that could make our lives easier. For instance, with DynamoDB, expression clauses have to be manually written as strings of instructions, while MongoDB allows for simple objects.

That's where this library comes in. It should mimick the basic MongoDB style of queries, not requiring any hand-written or generated conditions. Instead, pass in an object, Dynamongo will take care of sending it in the correct way to DynamoDB. 

_Note, this does not support any of the advanced MongoDB querying, instead, this simply allows you to use objects directly instead of having to write specific expressions._

Here's why:
* Stop spending time on writing the same database boilerplate for handling dynamic DynamoDB expressions and filters
* Use a library which takes care of this for you instead
* Focus your time on actually writing your application instead of database utilities

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [TypeScript](http://typescriptlang.org)
* [AWS-SDK](https://www.npmjs.com/package/aws-sdk)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Install the Dynamongo package into your project
  ```sh
  npm install dynamongo
  ```

## Usage

Get a Dynamongo instance, either through the singleton helper, or by instantiating it manually. Enter the region and optionally an object with supported options.
```js
const db = Dynamongo.GetInstance('eu-west-1', {
	isVerbose: true,
	timestampsEnabled: true,
	timestampCreatedField: 'createdAt',
	timestampUpdatedField: 'updatedAt'
});
```

Now you are ready to use this instance for querying the database.

### getByKey(table, keys)
```js
const data = await db.getByKey('my-db-table', {customId: 'abc-123'});
```

### updateByKey(table, keys, data)
```js
const result = await db.updateByKey('my-db-table', {customId: 'abc-123'}, {newData: '123'});
```

### deleteByKey(table, keys)
```js
const result = await db.deleteByKey('my-db-table', {customId: 'abc-123'});
```

### getWhere(table, data)

```js
const data = await db.getWhere('my-db-table', {firstName: 'Kevin', lastName: 'Van Ryckegem'});
```

### insert(table, data)
Note, by default, if data exists with the same keys, the data will be updated!

```js
const result = await db.insert('my-db-table', {firstName: 'Kevin', lastName: 'Van Ryckegem'});
```

## Roadmap

See the [open issues](https://github.com/kevinvr/dynamongo/issues) for a list of proposed features (and known issues).


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Kevin Van Ryckegem - [@kevinvanryck](https://twitter.com/kevinvanryck)

Project Link: [https://github.com/kevinvr/dynamongo](https://github.com/kevinvr/dynamongo)

## Acknowledgements
Reserved for contributors!


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/kevinvr/Dynamongo.svg?style=for-the-badge
[contributors-url]: https://github.com/kevinvr/Dynamongo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kevinvr/Dynamongo.svg?style=for-the-badge
[forks-url]: https://github.com/kevinvr/Dynamongo/network/members
[stars-shield]: https://img.shields.io/github/stars/kevinvr/Dynamongo.svg?style=for-the-badge
[stars-url]: https://github.com/kevinvr/Dynamongo/stargazers
[issues-shield]: https://img.shields.io/github/issues/kevinvr/Dynamongo.svg?style=for-the-badge
[issues-url]: https://github.com/kevinvr/Dynamongo/issues
[license-shield]: https://img.shields.io/github/license/kevinvr/Dynamongo.svg?style=for-the-badge
[license-url]: https://github.com/kevinvr/Dynamongo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/kevin-van-ryckegem