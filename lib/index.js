const sleep = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

exports.getPagefunctionResults = async (apifyClient, settings, cb) => {
  let execution = await apifyClient.crawlers.startExecution({
    crawlerId: settings._id,
    wait: 120,
    settings: settings
  })
  let executionId = execution._id

  // console.error('Started execution')
  // console.error(execution)

  let backoffSec = 4
  while (execution.status === 'RUNNING') {
    console.error('Backoff %d seconds - getting status of %s', backoffSec, executionId)
    await sleep(backoffSec * 1000)
    execution = await apifyClient.crawlers.getExecutionDetails({
      executionId: executionId
    })
    backoffSec *= 2
  }

  switch (execution.status) {
    case 'STOPPED':
    case 'TIMEOUT':
    case 'FAILED':
      throw Error('Execution failed')
    case 'RUNNING':
      throw Error('Execution still running')
    case 'SUCCEEDED':
      break
    default:
      throw Error('Unknown status %s', execution)
  }

  // console.error('Execution succeeded')

  const execResults = await apifyClient.crawlers.getExecutionResults({
    executionId: executionId
  })

  const results = []
  for (const execResult of execResults.items) {
    for (const result of execResult.pageFunctionResult.results) {
      results.push(result)
    }
  }

  return results
}
