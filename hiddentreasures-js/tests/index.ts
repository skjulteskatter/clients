import { SongService, Client } from "../build";

/** eslint-ignore-next */
const token = process.argv[2];

const client = new Client({
    onError: (r) => console.log(r),
    debug: true,
    getToken: async() => token,
});

const songService = new SongService(client);

songService.list().then(r => {
    console.log(r.length);
});
