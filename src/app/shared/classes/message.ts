export class Message {
    private _title: string;
    private _body: string;

    constructor(title: string, body: string){
        if(body && title){
            this._body = body;
            this._title = title;
        }
    }

    get title(): string {
        return this._title;
    }

    set title(newTitle: string) {
        if (newTitle) {
            this._title = newTitle;
        }
    }

    get body(): string {
        return this._body;
    }

    set body(newBody: string) {
        if (newBody) {
            this._body = newBody;
        }
    }
}