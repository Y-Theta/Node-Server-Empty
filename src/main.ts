import EXPRESS, { query, Request, Response } from "express";

const _prot:number = 10243;
const _root = "/test";

function s404(res: Response) {
    res.status(404);
    res.end();
}

const Server = EXPRESS();

Server.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

Server.get(_root + "/hello", OngetGood);
async function OngetGood(req: Request, res: Response) {
    res.status(200);
    res.write("hello world!");
    res.end();
}


Server.listen(_prot);