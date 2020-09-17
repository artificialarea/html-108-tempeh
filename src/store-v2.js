const compositions = [
    {  
        id: 1, 
        user_id: 1,
        title: 'Silencio', 
        date_modified: 1212883200000,
        visible: true, 
        tempo: 120,
        sequence_length: 16,
        step_sequence: [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ],
        mp3: '',
    },
    {  
        id: 2, 
        user_id: 1,
        title: 'FullBlastoff', 
        date_modified: 1212883200000,
        visible: true,
        tempo: 200,
        sequence_length: 16,
        step_sequence: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ], 
        mp3: '',
    },
    {  
        id: 3, 
        user_id: 1,
        title: 'Browser Noise', 
        date_modified: 1212883200000,
        visible: true,
        tempo: 80,
        sequence_length: 16,
        step_sequence: [
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
        ],
        mp3: '',
    },
];

const users = [
    {
        id: 1,
        username: "Anonymous",
        password: "aaAA11!!",        
        email: "guyfalks@hotmail.com"
    },
    {
        id: 2,
        username: "Dolfmeister",
        password: "aaAA11!!",        
        email: "dorf@aol.com"
    },
    {
        id: 3,
        username: "Plastikman",
        password: "aaAA11!!",        
        email: null
    },
];


module.exports = { compositions, users }