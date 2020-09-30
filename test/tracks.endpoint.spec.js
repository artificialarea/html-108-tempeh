const knex = require('knex');
const app = require('../src/app');
const { makeTracksArray, makeMaliciousTrack } = require('./tracks.fixtures');
const { makeUsersArray } = require('./users.fixtures');

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
    
    before('cleanup', () => db.raw('TRUNCATE TABLE tracks, users RESTART IDENTITY CASCADE;'));
    afterEach('cleanup', () => db.raw('TRUNCATE TABLE tracks, users RESTART IDENTITY CASCADE;'));

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
                    sequence_length: 8,
                    notes: ["G5", "Eb5", "C5", "G4"],
                    checked: [
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                    ],
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
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)  
                    .expect(200, [])
            });
        });

        context(`Given there are tracks in the db`, () => {
        
            const testUsers = makeUsersArray();
            const testTracks = makeTracksArray();

            beforeEach('insert tracks (and users) into db', () => {
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

        context('Given an XSS attack track', () => {
            const testUsers = makeUsersArray();
            const { maliciousTrack, expectedTrack} = makeMaliciousTrack();

            beforeEach('insert malicious track into db', () => {
                return db  
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('tracks')
                            .insert(maliciousTrack)
                    })
            });
                
            it(`removes XSS attack content`, () => {
                return supertest(app)
                    .get(`/api/tracks`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].title).to.eql(expectedTrack.title)
                    })
            });
        
        });
    });

    describe(`GET /api/tracks/:trackId`, () => {

        context(`Given no tracks`, () => {
            it('responds with 404', () => {
                return supertest(app)
                    .get('/api/tracks/123456')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`) 
                    .expect(404, { error: { message: `Track doesn't exist`}})
            });
        });
    
        context(`Given there are tracks in the db`, () => {
            const testUsers = makeUsersArray();
            const testTracks = makeTracksArray();

            beforeEach('insert tracks (and users) into db', () => {
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
            
            it(`responds with 200 and the specified track`, () => {
                const trackId = 2;
                const expectedTrack = testTracks[trackId - 1];
                return supertest(app)
                    .get(`/api/tracks/${trackId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedTrack)
            });
        });

        context(`Given an XSS attack track`, () => {
            const testUsers = makeUsersArray();
            const { maliciousTrack, expectedTrack} = makeMaliciousTrack();

            beforeEach('insert malicious track into db', () => {
                return db  
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('tracks')
                            .insert(maliciousTrack)
                    })
            });
                
            it(`removes XSS attack content`, () => {
                return supertest(app)
                    .get(`/api/tracks/${maliciousTrack.id}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.title).to.eql(expectedTrack.title)
                    })
            });
        
        });
    });

    describe(`POST /api/tracks`, () => {
        
        const testUsers = makeUsersArray();

        beforeEach('insert tracks (and users) into db', () => {
            return db  
                .into('users')
                .insert(testUsers)
        })

        it(`creates a track, responding with 201 and the new track`, function () {
            this.retries(3);    // repeat test to ensure that actual and expected date_published timestamps match
            const newTrack = {
                user_id: 1,
                title: 'Test new track', 
                visible: true,
                tempo: 200,
                sequence_length: 8,
                notes: ["G5", "Eb5", "C5", "G4"],
                checked: [
                    [true,true,true,true,true,true,true,true],
                    [true,true,true,true,true,true,true,true],
                    [true,true,true,true,true,true,true,true],
                    [true,true,true,true,true,true,true,true],
                ], 
            };
            return supertest(app)
                .post(`/api/tracks/`)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .send(newTrack)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.user_id).to.eql(newTrack.user_id)
                    expect(res.body.title).to.eql(newTrack.title)
                    expect(res.body.visible).to.eql(newTrack.visible)
                    expect(res.body.tempo).to.eql(newTrack.tempo)
                    expect(res.body.sequence_length).to.eql(newTrack.sequence_length)
                    expect(res.body.notes).to.eql(newTrack.notes)
                    expect(res.body.checked).to.eql(newTrack.checked)
                    expect(res.headers.location).to.eql(`/api/tracks/${res.body.id}`)
                    const expected = new Date().toLocaleString()
                    const actual = new Date(res.body.date_modified).toLocaleString()
                    expect(actual).to.eql(expected)
                })
                .then(postRes => {
                    return supertest(app)
                        .get(`/api/tracks/${postRes.body.id}`)
                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(postRes.body)
                })
        });
    
    });

    describe(`DELETE /api/tracks/:trackId`, () => {
        
        context(`Given no tracks`, () => {
            it(`responds with 404`, () => {
                const trackId = 123213123;
                return supertest(app)
                    .delete(`/api/tracks/${trackId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `Track doesn't exist` } })

            });
        });

        context(`Given there are tracks in the database`, () => {
            const testUsers = makeUsersArray();
            const testTracks = makeTracksArray();

            beforeEach('insert tracks (and users) into db', () => {
                return db  
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('tracks')
                            .insert(testTracks)
                    })
            })

            it(`responds with 204 and removes the track`, () => {
                const idToDelete = 2;
                const expectedTracks = testTracks.filter(track => track.id !== idToDelete);
                return supertest(app)
                    .delete(`/api/tracks/${idToDelete}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res => {
                        return supertest(app)
                            .get('/api/tracks')
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedTracks)
                    })
            });

        });


    });

    describe(`PATCH /api/tracks/:trackId`, () => {
        
        context(`Given no tracks`, () => {
            it(`responds with 404`, () => {
                const trackId = 123213123;
                return supertest(app)
                    .delete(`/api/tracks/${trackId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `Track doesn't exist` } })

            });
        });


        context(`Given there are tracks in the database`, () => {
            const testUsers = makeUsersArray();
            const testTracks = makeTracksArray();

            beforeEach('insert tracks (and users) into db', () => {
                return db  
                    .into('users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('tracks')
                            .insert(testTracks)
                    })
            })

            it(`responds with 204 and updates the track`, () => {
                const idToUpdate = 2;
                const updateTrack = {
                    user_id: 1,
                    title: 'Test update track', 
                    visible: true,
                    tempo: 200,
                    sequence_length: 8,
                    notes: ["G5", "Eb5", "C5", "G4"],
                    checked: [
                        [true,true,true,true,true,true,true,true],
                        [true,true,true,true,true,true,true,true],
                        [true,true,true,true,true,true,true,true],
                        [true,true,true,true,true,true,true,true],
                    ], 
                };
                const expectedTrack = {
                    ...testTracks[idToUpdate - 1],
                    ...updateTrack
                }
                return supertest(app)
                    .patch(`/api/tracks/${idToUpdate}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .send(updateTrack)
                    .expect(204)
                    .then(res => {
                        return supertest(app)
                            .get(`/api/tracks/${idToUpdate}`)
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedTrack)
                    })
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/tracks/${idToUpdate}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .send({ irrelevantField: 'foo' })
                    .expect(400, {
                        error: {
                            message: `Request body must contain either 'user_id', 'title', 'visible', 'tempo', 'sequence_length', 'notes' or 'checked'`
                        }
                    })
            });

            it(`responds with 204 when updating only a subset of fields (ignoring others)`, () => {
                const idToUpdate = 2;
                const updateTrack = {
                    title: 'updated only track title',
                }
                const expectedTrack = {
                    ...testTracks[idToUpdate - 1],
                    ...updateTrack
                }

                return supertest(app)
                    .patch(`/api/tracks/${idToUpdate}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .send({
                        ...updateTrack,
                        fieldToIgnore: `should not be in GET response`
                    })
                    .expect(204)
                    .then(res => {
                        return supertest(app)
                            .get(`/api/tracks/${idToUpdate}`)
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedTrack)
                    })
            });
        });


    });
});