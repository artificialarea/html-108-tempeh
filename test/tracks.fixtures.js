function makeTracksArray() {

    return [
        {  
            id: 1, 
            user_id: 1,
            title: 'Silencio', 
            date_modified: new Date(),
            visible: true, 
            tempo: 120,
            sequence_length: 16,
            audio_sequence: ["hihat", "clap", "trap", "bass"],
            step_sequence: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ],
        },
        {  
            id: 2, 
            user_id: 1,
            title: 'FullBlastoff', 
            date_modified: new Date(),
            visible: true,
            tempo: 200,
            sequence_length: 16,
            audio_sequence: ["hihat", "clap", "trap", "bass"],
            step_sequence: [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            ], 
        },
        {  
            id: 3, 
            user_id: 1,
            title: 'Browser Noise', 
            date_modified: new Date(),
            visible: true,
            tempo: 80,
            sequence_length: 16,
            audio_sequence: ["hihat", "clap", "trap", "bass"],
            step_sequence: [
                [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
            ],
        },
    ];
    
};

function makeMaliciousTrack() {
    const maliciousTrack = {
            id: 3, 
            user_id: 1,
            title: 'Naughty naughty very naughty <script>alert("xss");</script> PLUS Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.', 
            date_modified: new Date().toISOString(),
            visible: true,
            tempo: 80,
            sequence_length: 16,
            audio_sequence: ["hihat", "clap", "trap", "bass"],
            step_sequence: [
                [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
            ],
    }
    const expectedTrack = {
        ...maliciousTrack,
        title: 
            `Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;                                  
            PLUS Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`, 
        // line 76: converts script to render it inert
        // line 77: onerror="alert(document.cookie);" gets removed
    }
    return {
        maliciousTrack,
        expectedTrack,
    }
}


module.exports = { 
    makeTracksArray,
    makeMaliciousTrack
 }