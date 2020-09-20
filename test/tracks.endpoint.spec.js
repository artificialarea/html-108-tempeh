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
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    });
    after('disconnect from the database', () => db.destroy());

    before('cleanup', () => db.raw('TRUNCATE TABLE tracks, users RESTART IDENTITY;'));

    afterEach('cleanup', () => db.raw('TRUNCATE TABLE tracks, users RESTART IDENTITY;'));


    describe.skip('GET /api/tracks', () => {

        context('Given no tracks', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/tracks')
                    .expect(200, [])
            });
        });

        context(`Given there are tracks in the db`, () => {
        
            const testUsers = makeUsersArray();
            const testTracks = makeTracksArray();
            
            beforeEach('insert tracks into db', () => {
                return db
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('tracks')
                            .insert(testTracks);
                    })
            })
            
            it('responds with 200 and all of the tracks', function () {
                return supertest(app)
                    .get('/api/tracks')
                    .expect(200, testTracks)
            });
            
        });
    });
});