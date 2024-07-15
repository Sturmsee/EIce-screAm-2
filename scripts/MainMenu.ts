var startButton: HTMLDivElement;
var ruleButton: HTMLDivElement;


window.onload = () => {
    ruleButton = <HTMLDivElement>document.querySelector("rules"); 
    startButton = <HTMLDivElement>document.querySelector("start");
}

function OnClick(event: any, page: string): void {
    window.location.href = page;
}