import client from '../lib/elasticsearch.lib'

async function createFakeData() {
 // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })
}

async function searchForFakeData() {
	const { body } = await client.search({
		index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
	})

	console.log(body.hits.hits)
}

async function isIndexExist() {
	const response = await client.indices.exists({
		index: 'game-of-thrones'
	})
	const status = response.statusCode
	return status
}

async function runTest() {
	const statusCode = await isIndexExist()
	if (statusCode === 404) await createFakeData()
	await searchForFakeData()
}

export { runTest }