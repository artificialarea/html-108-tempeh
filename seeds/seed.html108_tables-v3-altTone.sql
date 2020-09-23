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
        (1, 'Silencio', false, 120, 16,  
        '{"G5", "Eb5", "C5", "G4"}',
        '{
            {false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false}
        }'      
        ),
        (1, 'So Full It Hurts', true, 120, 16,
        '{"G5", "Eb5", "C5", "G4"}',
        '{
            {true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true},
            {true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true},
            {true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true},
            {true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true}
        }'
        ),
        (1, 'Krautrock', true, 80, 16,
        '{"G5", "Eb5", "C5", "G4"}',
        '{
            {false, false, false, false, true, true, false, false, false, false, true, true, false, false, false, false},
            {false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false},
            {false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false},
            {true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false}
        }'
        ),
        (1, 'Browser Noise', true, 80, 16,
        '{"G5", "Eb5", "C5", "G4"}', 
        '{
            {true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false},
            {false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true},
            {true, true, false, false, true, true, false, false, true, true, false, false, true, true, false, false},
            {true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true}
        }'
        ),
        (1, 'Untitled', true, 220, 16,
        '{"G5", "Eb5", "C5", "G4"}',
        '{ 
            {false, false, false, true, false, false, true, false, false, false, false, false, false, false, false, false},
            {false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false},
            {true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true},
            {true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false}
        }'
        );

COMMIT;