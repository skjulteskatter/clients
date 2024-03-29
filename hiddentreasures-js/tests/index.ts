import { SongService, Client, ContributorService, CollectionService, NotificationService, SearchService, Role } from "../build";
import { writeFileSync } from "fs";

const token = process.argv[2];
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const client = new Client({
    onError: (r) => console.log(r),
    basePath: "https://api.songtreasures.app/",
    debug: true,
    getToken: async() => token,
});


const r1 = new Role("administrator");

const r2 = new Role("editor");

console.log(r2.fulfills(r1.value));

const songService = new SongService(client);

const contributorService = new ContributorService(client);

[
    "d8cefd5f-b923-43fa-8145-38bf8e3802e1",
    "2a396fe8-41ca-510b-aa8c-3f22fe47f342",
    "97e9f5ce-6ef5-401b-aa6e-521f3e07d06b",
    "34e7aa28-18fd-32d0-94e1-5296bd73e6a3"
].forEach(async (id) => {
    const contributor = await contributorService.get(id);

    console.log(contributor);
});

[
    "1507727e-ecf4-34fe-ad4d-6ade73c592d8",
    "0eb6e38f-0d76-3545-852a-99843a076ce4",
    "095c0db5-4309-5be9-b22d-cd50fa76e6f3",
].forEach(async (id) => {
    console.log((await songService.get(id)).title);
});


const collectionService = new CollectionService(client);

[
    "2a32a3fb-8a2c-4429-b10f-36e7f3213f55",
    "6229579a-66d2-4a72-aadf-1997e866d108",
    "d26b6088-f544-4359-bc4c-e14ddc7f2dcb"
].forEach(async (id) => {
    console.log((await collectionService.get(id)));
})

// collectionService.list().then(collections => {
//     songService.list().then(l => {
//         let csv = "id,collection,number,title";

//         for (const song of l) {


//             csv += [
//                 song.id,
//                 ...song.collections.map(i => [collections.find(c => c.id === i.collectionId).key, i.number])[0] ?? [null, null],
//                 song.title,
//             ].map(i => JSON.stringify(i)).join(",") + "\n"
//         }

//         writeFileSync("../export.csv", csv);
//     });
// })


const notificationService = new NotificationService(client);

notificationService.list().then(l => console.log(l));

const searchService = new SearchService(client);

searchService.search({
    query: "Stig opp på et høyt"
}).then(r => console.log(r));