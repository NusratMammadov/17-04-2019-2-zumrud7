// data-toggle attr olan bütün elementləri select edirik
var tooltips = document.querySelectorAll("[data-toggle='tooltip']");

var triangleDim = 7;

tooltips.forEach(function (elem) {
    // hər bir elementə mouseover eventi set olunur, yeni element əlavə olunur
    elem.addEventListener("mouseover", function (e) {
        e.preventDefault();
        // əlavə olunması üçün yeni div yaradırıq
        var tooltipDiv = document.createElement("div");

        // elementi esas css-ini goturmesi üçün mytooltip classi elave olunur
        tooltipDiv.classList.add("mytooltip");

        // elementi üçbucağının yerləşməsini seçmək class əlavə olunur

        var placement = this.dataset.placement;

        if (placement == undefined) {
            placement = "top";
        }

        tooltipDiv.classList.add(placement);

        // elementin içinin textini üzərinə gəlinmiş elementin title attr-ından götürürük
        var title = ""
        if (this.dataset.originalTitle != undefined) {
            title = this.dataset.originalTitle;
        } else {
            title = this.getAttribute("title");
            this.dataset.originalTitle = title;
            this.setAttribute("title", "");
        }
        tooltipDiv.innerText = title;

        // body tag-inin içinə əlavə edirik
        document.body.append(tooltipDiv);

        // bu elementin ölçüləri və body bağlı olan kordinatlarını götürürük
        var rect = this.getBoundingClientRect();

        // yaradılmış elementin ölçüləri götürürük
        var tooltipDivRect = tooltipDiv.getBoundingClientRect();



        // ae = üzərinə gəlinmiş element
        // ye = yeni yaradılmış element
        // tr = yeni elementın afterında olan üçbucaq
        if (placement == "top") {
            // soldan  = ae x koordinatnın üzərinə ae eni çıxılsın ye eni bülünsün 2
            tooltipDiv.style.left = (rect.x + ((rect.width - tooltipDivRect.width) / 2)) + "px";

            // yuxarıdan = ae y koordinatına ye hündürlüyünə tr hündürlüyü çıxırıq
            tooltipDiv.style.top = (rect.y - (tooltipDivRect.height + triangleDim)) + "px";

        } else if (placement == "bottom") {
            // soldan  = ae x koordinatnın üzərinə ae eni çıxılsın ye eni bülünsün 2
            tooltipDiv.style.left = (rect.x + ((rect.width - tooltipDivRect.width) / 2)) + "px";

            // yuxarıdan = ae y koordinat ye hündürlüyünə tr hündürlüyü toplayırıq
            tooltipDiv.style.top = (rect.y + rect.height + triangleDim) + "px";
        } else if (placement == "left") {
            // soldan = ae x koordinatından ye  eni və tr enini çıxırıq
            tooltipDiv.style.left = (rect.x - (tooltipDivRect.width + triangleDim)) + "px";

            // yuxarıdan  = ae y koordinatnın üzərinə ae hündürlüyü çıxılsın ye hündürlüyü bülünsün 2
            tooltipDiv.style.top = (rect.y + ((rect.height - tooltipDivRect.height) / 2)) + "px";
        } else {
            // soldan = ae x koordinatından ye eni və tr enini toplayırıq
            tooltipDiv.style.left = (rect.x + rect.width + triangleDim) + "px";

            // yuxarıdan  = ae y koordinatnın üzərinə ae hündürlüyü çıxılsın ye hündürlüyü bülünsün 2
            tooltipDiv.style.top = (rect.y + ((rect.height - tooltipDivRect.height) / 2)) + "px";
        }

        setOpacity(tooltipDiv);
    });

    // hər bir elementə mouseout eventi set olunur, yaradılmış sonuncu element silinir
    elem.addEventListener("mouseout", function () {
        var activeTooltip = document.querySelector("body .mytooltip");
        activeTooltip.remove();
    });
});


function setOpacity(elem) {
    var opacity = 0;
    var interval = window.setInterval(function () {
        opacity += 10;
        elem.style.opacity = opacity;
        if (opacity >= 100) {
            window.clearInterval(interval);
        }
    }, 50);
}

window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});