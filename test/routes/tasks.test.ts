import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tasks routes', () => {
    describe('Get tasks', () => {
        it('should return correct response on /tasks route', (done) => {
            chai.request(app)
                .get('/tasks')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
