const TracksService = {

    getAllTracks(db) {
        return db
            .from('tracks')
            .select('*')
    },
    
    getTrackById(db, id) {
        return db
            .from('tracks')
            .select('*')
            .where('id', id)
            .first()
    },

    insertTrack(db, newTrack) {
        return db
            .insert(newTrack)
            .into('tracks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    updateTrack(db, id, newTrackFields) {
        return db
            .from('tracks')
            .where({ id })
            .update(newTrackFields, returning = true)
            .returning('*')
    },

    deleteTrack(db, id) {
        return db
            .from('tracks')
            .where({ id })
            .delete()
    }
}

module.exports = TracksService