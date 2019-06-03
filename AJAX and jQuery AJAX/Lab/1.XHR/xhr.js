function loadRepos() {
    let xhr = new XMLHttpRequest();
    let url = "https://api.github.com/users/testnakov/repos";
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('res').textContent = this.responseText;
        }
    };
    xhr.send();
}