const { expect } = require('chai')
const sinon = require('sinon')

const getPeople = require('src/api/v2/people/getPeople')

describe('getPeople', () => {
  const res = {
    json: sinon.spy()
  }
  res.status = sinon.stub().returns(res)
  const resetStubs = () => {
    res.json.resetHistory()
    res.status.resetHistory()
  }

  context('given a valid token in the header', () => {
    const req = {
      get: () => 'some-access-token'
    }

    before(() => {
      getPeople(req, res)
    })

    after(resetStubs)

    it("didn't call res.status", () => {
      expect(res.status).not.to.have.been.called
    })

    it('called res.json', () => {
      expect(res.json).to.have.been.calledOnce
    })
  })

  context('without a valid token in the header', () => {
    const req = {
      get: () => undefined
    }

    before(() => {
      getPeople(req, res)
    })

    after(resetStubs)

    it('called res.status', () => {
      expect(res.status).to.have.been.calledWith(401)
    })

    it('called res.json', () => {
      expect(res.json).to.have.been.calledOnce
    })
  })
})
