const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../index');
const query = require('../db/movies');
const should = chai.should();

chai.use(chaihttp);

const testMovie = {
  title: 'The Godfather',
  director: 'Francis Ford Coppola',
  year: 1972
}

describe('/POST movies', () => {
  beforeEach((done) => {
    query.deleteAllMovies();
    done();
  });

  it('Add new movie', (done) => {
    chai.request(app)
      .post('/api/movies')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(testMovie))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        done();
      });
  });
});

describe('/GET movies', () => {
  it('Fetch all movies', (done) => {
    chai.request(app)
      .get('/api/movies') 
      .end((err, res) => {
         res.should.have.status(200);
         res.body.should.be.a('array');
         res.body.length.should.be.eql(1);
         done();
      });
  });
});