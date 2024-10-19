type teamType = {
    id: string;
    name: string;
    description: string;
    adminId: string;
    user?: {
        userID?: string;
    }
}

interface allteamTypes extends teamType, Request {

}


export { allteamTypes, teamType };

