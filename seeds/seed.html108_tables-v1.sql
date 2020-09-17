BEGIN;

TRUNCATE
    users,
    compositions
    RESTART IDENTITY CASCADE;

INSERT INTO users (username, email, password)
VALUES
    ('dorfmeister', 'dorf@aol.com', 'aaAA11!!'),
    ('ritchie hawtin', null, 'aaAA11!!'),
    ('satchmo', 'satchmo808@gmail.com', 'aaAA11!!');

INSERT INTO compositions (
    user_id,
    title, 
    visible, 
    tempo, 
    sequence_length,
    sequence_hihat,
    sequence_clap,
    sequence_trap,
    sequence_bass,
    mp3)
    VALUES
        (1, 'Silencio', false, 120, 16,  
        '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}',
        '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}',
        '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}',
        '{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}',
        null        
        ),
        (1, 'So Full It Hurts', true, 120, 16,  
        '{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}',
        '{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}',
        '{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}',
        '{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}',
        null
        ),
        (1, 'Krautrock', true, 80, 16,  
        '{1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1}',
        '{1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1}',
        '{1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1}',
        '{0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0}',
        null
        ),
        (2, 'Browser Noise', true, 80, 16,  
        '{1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0}',
        '{1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1}',
        '{1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1}',
        '{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}',
        null
        ),
        (3, 'Untitled', true, 220, 16,  
        '{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}',
        '{1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1}',
        '{1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1}',
        '{1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0}',
        null
        );

COMMIT;