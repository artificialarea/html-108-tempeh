const TrackService = {

    //relevant
    getTracks(db) {
        return db
            .from('tracks')
            .select(
                'compositiion.id',
                'compositiion.title',
            )
    },
    getTrackById(db, track_id) {
        return db
            .from('tracks')
            .select(
                'compositiion.id',
                'compositiion.title',
            )
            .where('compositiion.id', track_id)
            .first()
    },
    //relevant
    insertTrack(db, newtrack) {
        return db
            .insert(newtrack)
            .into('tracks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    updateTrack(db, track_id, newtrack) {
        return db('tracks')
            .where({
                id: track_id
            })
            .update(newtrack, returning = true)
            .returning('*')
    },
    //relevant
    deleteTrack(db, track_id) {
        return db('tracks')
            .where({
                'id': track_id
            })
            .delete()
    }
}

module.exports = TrackService