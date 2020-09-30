function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'admin_node',
            password: 'aaAA11!!',
            email: 'somebody@somewhere.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 2,
            username: 'Dolfmeister',
            password: 'aaAA11!!',
            email: 'somebody2@somewhere.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 3,
            username: 'Plastikman',
            password: 'aaAA11!!',
            email: 'somebody3@somewhere.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
    ];
}; 

function makeMaliciousUser() {
    const maliciousUser = {
        id: 1,
        username: 'Naughty naughty very naughty <script>alert("xss");</script>',
        password: 'Naughty naughty very naughty <script>alert("xss");</script>',
        email: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        date_created: '2029-01-22T16:28:32.615Z',
    }
    const expectedUser = {
        ...maliciousUser,
        username: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        password: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;', // converts script to render it inert
        email: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.` // onerror="alert(document.cookie);" gets removed
    }
    return {
        maliciousUser,
        expectedUser,
    }
}

module.exports = {
    makeUsersArray,
    makeMaliciousUser,
}