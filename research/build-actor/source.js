const Apify = require('apify')
const actId = 'bd84eHbgNMi28u9bH'

Apify.main(async () => {
  const apifyClient = Apify.client

  console.log('building act')
  let actBuild = await apifyClient.acts.buildAct({
    actId: actId,
    useCache: true,
    waitForFinish: 0,
    version: '0.0'
  })
  const buildId = actBuild.id

  console.log(actBuild)

  while (actBuild.status == 'RUNNING') {
    console.log('Getting status of %s', buildId)
    actBuild = await apifyClient.acts.getBuild({
      buildId: buildId,
      waitForFinish: 10
    })
  }

  console.log('completed')
  console.log(actBuild)
})
