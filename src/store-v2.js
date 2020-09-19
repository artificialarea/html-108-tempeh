const tracks = [
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

const users = [
    {
        id: 1,
        username: "admin_node",
    },
    {
        id: 2,
        username: "Dolfmeister",
    },
    {
        id: 3,
        username: "Plastikman",
    },
];


module.exports = { tracks, users }