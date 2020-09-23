const knex = require('knex');
const app = require('../src/app');
const { makeTracksArray, makeMaliciousTrack } = require('./tracks.fixtures');
const { makeUsersArray } = require('./users.fixtures');
const supertest = require('supertest');

describe(`Tracks API Endpoints`, () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    });
    after('disconnect from the database', () => db.destroy());
    
    // before('cleanup', () => db.raw('TRUNCATE TABLE tracks, users RESTART IDENTITY;'));
    
    // afterEach('cleanup', () => db.raw('TRUNCATE TABLE tracks, users RESTART IDENTITY;'));

    describe('Unauthorized requests', () => {

        it(`responds with 401 Unauthorized for GET /api/tracks`, () => {
            return supertest(app)
                .get('/api/tracks')
                .expect(401, { error: 'Unauthorized request' })
        });

        it(`responds with 401 Unauthorized for POST /api/tracks`, () => {
            return supertest(app)
                .post('/api/tracks')
                .send({  
                    // id: 1, 
                    user_id: 1,
                    title: 'Unauthorized and Untitled', 
                    // date_modified: new Date('2029-01-22T16:28:32.615Z'),
                    visible: true, 
                    tempo: 120,
                    sequence_length: 16,
                    notes: ["hihat", "clap", "trap", "bass"],
                    checked: [
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    ]
                })
                .expect(401, { error: 'Unauthorized request' })
        });

        it(`responds with 401 Unauthorized for GET /api/tracks/:trackId`, () => {
            const testTracks = makeTracksArray();
            const secondTrack = testTracks[1];
            return supertest(app)
                .get(`/api/tracks/${secondTrack.id}`)
                .expect(401, { error: 'Unauthorized request' })
        });

        it(`responds with 401 Unauthorized for DELETE /api/tracks/:trackId`, () => {
            const testTracks = makeTracksArray();
            const secondTrack = testTracks[1];
            return supertest(app)
                .delete(`/api/tracks/${secondTrack.id}`)
                .expect(401, { error: 'Unauthorized request' })
        });
    });
    

    describe('GET /api/tracks', () => {

        context('Given no tracks', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/tracks')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)  // via setup.js
                    .expect(200, [])
            });
        });

        context(`Given there are tracks in the db`, () => {
        
            const testUsers = makeUsersArray();
            const testTracks = makeTracksArray();

            // ISSUE
            // if remove .catch(), get error 
            // insert into "tracks" - insert or update on table "tracks" violates foreign key constraint "tracks_user_id_fkey"
            // with .catch(), get error 
            // actual [] (table not populated???)
            beforeEach('insert users & tracks into db', () => {
                return db  
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('tracks')
                            .insert(testTracks)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            
            it('responds with 200 and all of the tracks', function () {
                return supertest(app)
                    .get('/api/tracks')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testTracks)
            });
            
        });
    });
});