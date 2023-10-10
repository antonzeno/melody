import prisma from './client'

type User = {
    name: string;
    username: string;
    email: string;
    password: string;
}


function getUsers(): Array<User> {
    return [
        {
            name: "Anton Zeno",
            username: "antonzeno",
            email: "tonizeno5@gmail.com",
            password: ""
        },
        {
            name: "Emma Johnson",
            username: "emmaj",
            email: "emma.j@example.com",
            password: ""
        },
        {
            name: "Michael Smith",
            username: "mikes",
            email: "mikes@example.com",
            password: ""
        },
        {
            name: "Sophia Brown",
            username: "sophiab",
            email: "sophia.b@example.com",
            password: ""
        }

    ]
}


(async function seed() {
    await Promise.all(
        getUsers().map(user => prisma.user.create({
            data: {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
            }
        }))
    )
})()