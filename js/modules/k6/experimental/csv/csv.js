import { open } from 'k6/experimental/fs'
import csv from 'k6/experimental/csv'

let file;
(async function () {
	file = await open('data.csv');
})();

export default async function() {
	let parser = new csv.Parser(file, {
		delimiter: ',',
		skipFirstLine: true,
		fromLine: 3,
		toLine: 13,
	})

	while (true) {
		const {done, value} = await parser.next();
		if (done) {
			break;
		}

		console.log(value)
	}
}
