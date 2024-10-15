/* 
    tareas 
    usar el plugin de chai-http
    npm install chai-http --save-dev

    para usarlo 
    chai.use('chai-http');
*/

process.env.NODE_ENV = 'test';
import {server} from '../server.js';
import chai from 'chai';
import { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

// lenvantamos el servidor

before((done) => {
    server.on('app_started', () => {
        done();
    }); 
})

 

// realizamos la primera prueba 

/* 
    verificamos que el status sea 200 utilizando el parametro done
    
*/

describe('prueba de peticiones', () => {

    it('deberia regresar un status 200', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            });
    }); 

});

/* 
    segunda prueba 
    obtener el id de la tarea asignada para luego eliminarla
*/

let idTarea = '';
it('insertando una tarea', (done) => {  
    chai.request(server)
        .post('/tareas')
        .send({ nombre: 'insertando prueba mocha ABC', echo: false })
        .end((err, res) => {
            idTarea = res.body._id;
            assert.equal(res.status, 200);
            done();
        });
});

/* 
    verificamos la nueva tarea este agg en la ruta /tarea
*/

it('verificando que la tarea se inserto correctamente', (done) => {
    chai.request(server)
        .get('/tareas')
        .end((err, res) => {
            assert.equal(res.status, 200);
            let tareas = res.body;
            let tarea = tareas.find(tarea => tarea._id === idTarea);
            assert.equal(tarea._id, idTarea);
            done();
        });
});

/*
    ahora eliminamos la tarea que acabamos de agg
*/

it('eliminando la tarea', (done) => {
    chai.request(server)
        .delete(`/tareas/${idTarea}`)
        .end((err, res) => {
            assert.equal(res.status, 200);
            done();
        });
});