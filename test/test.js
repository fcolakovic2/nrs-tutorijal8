let server = require("../server")
let chai = require("chai")
let chaiHttp = require("chai-http")
let mocha = require("mocha")


import { start } from '../tutorijal6.js';
import { close } from '../tutorijal6.js';
import { refresujSve } from '../tutorijal6.js'

chai.should()
chai.use(chaiHttp)


describe('Tut8', function() {
   
    before(function () {
        start()
    });

    after(function () {
        close()
    });

    beforeEach(function () {
        refresujSve()
    });

    afterEach(function () {
        refresujSve()
    });


    describe ('Tut8 getput', function() {
      it('vratiti OK status nakon geta na grad', function(done){
        chai.request(server).get("/gradovi").end((err, res) => {
            res.should.have.status(200);
            done()
        });
        }); 

       it('vratiti OK status 200 nakon put zahtjeva na gradove', function(done) {
        chai.request(server).put("/gradovi/2").end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.equal("Connected");
            done()
        });
        }); 
    });

   describe ('Tut8Delete', function() {
        it('vratiti status 200 nakon deletea grada', function(done){
            chai.request(server).get("/gradovi/1").end((err, res) => {
                res.should.have.status(200);
                done()
            });
        });

    });
});