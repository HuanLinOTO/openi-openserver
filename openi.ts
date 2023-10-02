import fs from 'fs';
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
// print(config)
console.log(config);

class OpenIAPI {
    private _token: string;
    private _repos: string[];

    constructor(token: string, repos: string[]) {
        this._token = token;
        this._repos = repos;
    }

    async get_repo_info(): Promise<any> {
        let result: Record<string,string> = {};
        for (const repo of this._repos) {
            const api: string = `https://openi.pcl.ac.cn/api/v1/datasets/${repo}/current_repo?access_token=${this._token}&type=0`;
            result[repo] = await fetch(api).then(res => res.json());
        }
        return result
    }

    async get_download_url(uuid: string): Promise<string> {
        const api: string = `https://openi.pcl.ac.cn/api/v1/attachments/${uuid}?access_token=${this._token}&type=0`;
        return await fetch(api, {
            redirect: "manual"
        }).then(res => res.headers.get("location"));
    }
}
let openi = new OpenIAPI(config.token, config.repos)

export default openi;
