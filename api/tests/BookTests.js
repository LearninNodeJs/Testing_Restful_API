process.env.NODE_ENV ='test';

let mongoose = require('mongoose');
let Book = require('../../api/model/Book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Books',()=>{
    beforeEach((done)=>{
        Book.remove({},(err)=>{
            done();
        })
    })
});
describe('/Get Book',()=>{
    it('it should GET all the Books',(done)=>{
        setTimeout(done,1000);
        chai.request(server)
            .get('/book')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
    })
});

