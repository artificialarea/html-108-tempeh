const trackService = {

    //relevant
    gettracks(db) {
        return db
            .from('tracks')
            .select(
                'compositiion.id',
                'compositiion.title',
            )
    },
    gettrackById(db, track_id) {
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
    inserttrack(db, newtrack) {
        return db
            .insert(newtrack)
            .into('tracks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    updatetrack(db, track_id, newtrack) {
        return db('tracks')
            .where({
                id: track_id
            })
            .update(newtrack, returning = true)
            .returning('*')
    },
    //relevant
    deletetrack(db, track_id) {
        return db('tracks')
            .where({
                'id': track_id
            })
            .delete()
    }
}

module.exports = trackService