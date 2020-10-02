function makeTracksArray() {
    return [
        {  
            id: 1, 
            user_id: 1,
            title: 'Silencio', 
            date_modified: '2100-05-22T16:28:32.615Z', 
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
        },
        {  
            id: 2, 
            user_id: 1,
            title: 'FullBlastoff', 
            date_modified: '2029-01-22T16:28:32.615Z',
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
        },
        {  
            id: 3, 
            user_id: 1,
            title: 'Browser Noise', 
            date_modified: '1919-12-22T16:28:32.615Z',
            visible: true,
            tempo: 80,
            sequence_length: 8,
            notes: ["G5", "Eb5", "C5", "G4"],
            checked: [
                [false,false,false,false,false,true,true,false],
                [true,false,true,false,false,false,false,true],
                [false,true,false,false,false,true,false,false],
                [true,false,true,false,true,false,true,false],
            ],
        },
    ];
    
};

function makeMaliciousTrack() {
    const maliciousTrack = {
            id: 3, 
            user_id: 1,
            title: `Naughty naughty very naughty <script>alert("xss");</script> 
            PLUS Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`, 
            date_modified: new Date().toISOString(),
            visible: true,
            tempo: 80,
            sequence_length: 8,
            notes: ["G5", "Eb5", "C5", "G4"],
            checked: [
                [false,false,false,false,false,true,true,false],
                [true,false,true,false,false,false,false,true],
                [false,true,false,false,false,true,false,false],
                [true,false,true,false,true,false,true,false],
            ],
    }
    const expectedTrack = {
        ...maliciousTrack,
        title: 
            `Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt; 
            PLUS Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`, 
        // first line: converts script to render it inert
        // second line: onerror="alert(document.cookie);" gets removed
    }
    return {
        maliciousTrack,
        expectedTrack,
    }
}


module.exports = { 
    makeTracksArray,
    makeMaliciousTrack,
}