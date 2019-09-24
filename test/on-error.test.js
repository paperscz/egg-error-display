"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const egg_mock_1 = tslib_1.__importDefault(require("egg-mock"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const assert = require("assert");
describe('test/on-error.test.ts', () => {
    let app;
    before(async () => {
        app = egg_mock_1.default.app({
            baseDir: 'apps/on-error',
        });
        return app.ready();
    });
    after(() => app.close());
    afterEach(egg_mock_1.default.restore);
    it('should get /', () => {
        return supertest_1.default(app.callback())
            .get('/')
            .expect('hi, errorDisplay')
            .expect(200);
    });
    it('should error with detail information', async () => {
        const res = await supertest_1.default(app.callback()).get('/error').expect(500);
        assert(res.text.startsWith('<!DOCTYPE html>'));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tZXJyb3IudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9uLWVycm9yLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0VBQTJCO0FBQzNCLGtFQUErQjtBQUMvQixpQ0FBaUM7QUFFakMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsRUFBRTtJQUNuQyxJQUFJLEdBQVEsQ0FBQTtJQUNaLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNkLEdBQUcsR0FBRyxrQkFBSSxDQUFDLEdBQUcsQ0FBQztZQUNYLE9BQU8sRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQTtRQUVGLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBRXhCLFNBQVMsQ0FBQyxrQkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXZCLEVBQUUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO1FBQ3BCLE9BQU8sbUJBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQzthQUNSLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzthQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsc0NBQXNDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFbkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtJQUNsRCxDQUFDLENBQUMsQ0FBQTtBQUVOLENBQUMsQ0FBQyxDQUFBIn0=