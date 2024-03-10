let factEl = document.getElementById("funFact");
fetch("/funfact").then(resp => resp.json()).then(data => {
    console.log(data);
    factEl.innerText = data.fact;}
);
