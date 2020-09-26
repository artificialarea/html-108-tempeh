BEGIN;

TRUNCATE
    users,
    tracks
    RESTART IDENTITY CASCADE;

INSERT INTO users (username, password, email)
VALUES
    ('admin_psql', 'aaAA11!!', null),
    ('anonymous', 'aaAA11!!', 'guyfawkes@hushmail.com'),
    ('plastikman', 'aaAA11!!', null);

INSERT INTO tracks (
    user_id,
    title,
    visible,
    tempo,
    sequence_length,
    notes,
    checked)
    VALUES
        (1, 'So Full It Hurts', true, 120, 8,
        '{"G5", "Eb5"}',
        '{
            {true, true, true, true, true, true, true, true},
            {true, true, true, true, true, true, true, true},
            {true, true, true, true, true, true, true, true},
            {true, true, true, true, true, true, true, true}
        }'
        );

COMMIT;