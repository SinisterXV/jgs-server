let table = document.getElementById("fileList");
let fetchMsg = document.getElementById("fetchMsg");

getFiles = function () {
	fetch("/desktop/list", {
		method: "GET",
		headers: { Accept: "application/json" },
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.desktopFiles.length !== 0) {
				fetchMsg.remove();

				data.desktopFiles.forEach((file) => {
					const newRow = document.createElement("tr");

					const fileCol = document.createElement("td");
					fileCol.innerText = file;

					const downloadCol = document.createElement("td");

					const downloadBtt = document.createElement("a");
					downloadBtt.innerText = "Download";
					downloadBtt.setAttribute("href", `/desktop/${file}`);
					downloadBtt.setAttribute("class", "btn");

					const downloadImg = document.createElement("i");
					downloadImg.setAttribute("class", "fa fa-download");

					downloadBtt.appendChild(downloadImg);
					downloadCol.appendChild(downloadBtt);
					newRow.appendChild(fileCol);
					newRow.appendChild(downloadCol);
					table.appendChild(newRow);
				});
			} else {
				fetchMsg.innerText = "No files available for download";
			}
		});
};

window.onload = getFiles();
