import mock from 'egg-mock'
import request from 'supertest'
import assert = require('assert')

describe('test/on-error.test.ts', () => {
    let app: any
    before(async () => {
        app = mock.app({
            baseDir: 'apps/without-appInfo',
        })

        return app.ready()
    })

    after(() => app.close())

    afterEach(mock.restore)

    it('should get /', () => {
        return request(app.callback())
            .get('/')
            .expect('hi, errorDisplay')
            .expect(200)
    })

    it('should error with detail information but without sensitive information', async () => {
        const res = await request(app.callback()).get('/error').expect(500)

        assert(res.text.startsWith('<!DOCTYPE html>'))
        assert(!res.text.includes('EGG_SESS'))
    })

    it('should error with detail information for json request', async () => {
        const res = await request(app.callback())
            .get('/error')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)

        assert.ok(JSON.parse(res.text))
        assert.deepStrictEqual(res.body.message, 'test')
    })

    it('should show ctx.throw errors', async () => {
        const res = await request(app.callback())
            .get('/throw')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)

        assert.ok(JSON.parse(res.text))
        assert.deepStrictEqual(res.body.message, 'test-throw')
    })

    it('should show errors for customized throw', async () => {
        const res = await request(app.callback())
            .get('/customized-throw')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)

        assert.ok(JSON.parse(res.text))
        assert.deepStrictEqual(res.body.message, 'non-error thrown: {"errmessage":"hello"}')
    })

    it('should show errors for ctx.throw in middleware', async () => {
        const res = await request(app.callback())
            .get('/middleware-error')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)

        assert(res.body.message === 'error!')
    })

    it('should show errors for ctx.throw raw error in middleware', async () => {
        const res = await request(app.callback())
            .get('/middleware-error-2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)

        assert(res.body.message === 'raw message')
        assert(res.body.detail === 'detail')
    })

    it('should show errors for ctx.throw raw error in middleware', async () => {
        const res = await request(app.callback())
            .get('/middleware-error-2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)

        assert(res.body.message === 'raw message')
        assert(res.body.detail === 'detail')
    })

    it('should show errors for inlineSourceMap=true ts project', async () => {
        const res = await request(app.callback())
            .get('/green')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(500)

        assert(res.text.startsWith('<!DOCTYPE html>\n'))
    })
})
