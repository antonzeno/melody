import prisma from "./client";

type User = {
    name: string;
    email: string;
    password: string;
};

function getUsers(): Array<User> {
    return [
        {
            name: "Anton Zeno",
            email: "tonizeno5@gmail.com",
            password: "",
        },
        {
            name: "Emma Johnson",
            email: "emma.j@example.com",
            password: "",
        },
        {
            name: "Michael Smith",
            email: "mikes@example.com",
            password: "",
        },
        {
            name: "Sophia Brown",
            email: "sophia.b@example.com",
            password: "",
        },
    ];
}

(async function seed() {
    await Promise.all(
        getUsers().map((user) =>
            prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                },
            }),
        ),
    );
})();
