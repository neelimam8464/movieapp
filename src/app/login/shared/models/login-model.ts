export const allowedUsers: loginDetails[] = [
    {
        userId: 1,
        role: 'admin',
        userName: 'admin',
        password: '12345',
    },
    {
        userId: 2,
        role: 'user',
        userName: 'user1',
        password: '12345',
    },
    {
        userId: 3,
        role: 'user',
        userName: 'user2',
        password: '12345',
    },
    {
        userId: 4,
        role: 'user',
        userName: 'user3',
        password: '12345',
    },
];

export class loginDetails {
    userId: number;
    userName: string;
    password: string;
    role: string;
}
