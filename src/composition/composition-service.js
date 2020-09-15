const CompositionService = {

    //relevant
    getCompositions(db) {
        return db
            .from('compositions')
            .select(
                'compositiion.id',
                'compositiion.title',
            )
    },
    getCompositionById(db, composition_id) {
        return db
            .from('compositions')
            .select(
                'compositiion.id',
                'compositiion.title',
            )
            .where('compositiion.id', composition_id)
            .first()
    },
    //relevant
    insertComposition(db, newComposition) {
        return db
            .insert(newComposition)
            .into('compositions')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //relevant
    updateComposition(db, composition_id, newComposition) {
        return db('compositions')
            .where({
                id: composition_id
            })
            .update(newComposition, returning = true)
            .returning('*')
    },
    //relevant
    deleteComposition(db, composition_id) {
        return db('compositions')
            .where({
                'id': composition_id
            })
            .delete()
    }
}

module.exports = CompositionService