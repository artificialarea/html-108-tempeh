const knex = require('knex');
const app = require('../src/app');
const { makeTracksArray, makeMaliciousTrack } = require('./tracks.fixtures');
const { makeUsersArray } = require('./users.fixtures');
const supertest = require('supertest');

describe.skip(`Tracks API Endpoints`, () => {
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


    describe('GET /api/tracks', () => {

        context(`Given there are tracks in the db`, () => {
        
            const testTracks = makeTracksArray();
            
            beforeEach('insert tracks into db', () => {
                return db
                .into('tracks')
                .insert(testTracks);
            })
            
            it('responds with 200 and all of the tracks', function () {
                return supertest(app)
                .get('/api/tracks')
                .expect(200, testTracks)
            });
            
        });
    });
});