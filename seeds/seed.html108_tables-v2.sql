BEGIN;

TRUNCATE
    users,
    compositions
    RESTART IDENTITY CASCADE;

INSERT INTO users (username, password, email)
VALUES
    ('admin_psql', 'aaAA11!!', null),
    ('anonymous', 'aaAA11!!', 'guyfawkes@hushmail.com'),
    ('plastikman', 'aaAA11!!', null);

INSERT INTO compositions (
    user_id,
    title, 
    visible, 
    tempo, 
    sequence_length,
    audio_sequence,
    step_sequence)
    VALUES
        (1, 'Silencio', false, 120, 16,  
        '{"hihat", "clap", "trap", "bass"}',
        '{
            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}
        }'      
        ),
        (1, 'So Full It Hurts', true, 120, 16,
        '{"hihat", "clap", "trap", "bass"}',
        '{
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}
        }'
        ),
        (1, 'Krautrock', true, 80, 16,
        '{"hihat", "clap", "trap", "bass"}',
        '{
            {1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
            {1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1},
            {1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1},
            {0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0}
        }'
        ),
        (1, 'Browser Noise', true, 80, 16,
        '{"hihat", "clap", "trap", "bass"}', 
        '{
            {1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0},
            {1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1},
            {1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1},
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}
        }'
        ),
        (1, 'Untitled', true, 220, 16,
        '{"hihat", "clap", "trap", "bass"}',
        '{ 
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
            {1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1},
            {1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1},
            {1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0}
        }'
        );

COMMIT;