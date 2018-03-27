const { stringify } = require('qs')
const { CLIENT_ID } = require('../../utils/config')
const { ERRORS } = require('../../utils/constants')

const makeResponse = redirectUri =>
  `<html><head><title>Mock MemberConnex</title></head>
<body>
  <form action="/handleLogin" method="post">
    <label for="username">Username</Label>
    <input id="username" name="username" placeholder="username" />
    <br/>
    <label for="password">Password</Label>
    <input id="password" name="password" type="password" />
    <br/>
    <input name="redirectUri" type="hidden" value="${redirectUri}" />
    <button type="submit">Log in</button>
  </form>
</body>
</html>
`

/*
  Action=MCXLogin &response_type=code
  &client_id=[client_ID]
  &scope=[optional]
  &Provider=[optional] &redirect_uri=[redirect_uri] &state=[generated by you]
*/
const getOAuthLogin = (req, res) => {
  const {
    Action: action,
    client_id: clientId,
    // scope,
    // Provider: provider,
    redirect_uri: redirectUri,
    state
  } = req.query

  if (CLIENT_ID !== clientId) {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else if (action !== 'MCXLogin') {
    res.status(400).json({ error: ERRORS.INVALID_REQUEST })
  } else {
    const params = stringify({
      code: 'some-test-code',
      state
    })

    res.send(makeResponse(`${redirectUri}?${params}`))
  }
}

module.exports = getOAuthLogin