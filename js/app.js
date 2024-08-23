(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    $(document).ready((function() {
        showPhoto();
    }));
    function showPhoto() {
        const hero = $("#hero");
        const stub = $("#stub");
        if (hero.length > 0 && hero[0].complete && hero[0].naturalWidth !== 0) {
            hero.show();
            stub.hide();
        } else {
            hero.hide();
            stub.show();
        }
    }
    $(".vertical .progress-fill span").each((function() {
        var percent = parseInt($(this).html());
        var maxHeight = 100;
        var height = Math.round(percent / 15 * maxHeight);
        if (percent < 3) $(this).parent().css({
            height: height + 30 + "px"
        }); else $(this).parent().css({
            height: height + "px"
        });
    }));
    var maxFillHeight = Math.max.apply(null, $(".vertical .progress-fill").map((function() {
        return $(this).height();
    })).get());
    $(".vertical .progress-bar").css({
        height: maxFillHeight + 16 + "px",
        "margin-top": 5 + "px"
    });
    $(".icon-menu").click((function(e) {
        if ($(e.target).closest(".icon-menu").length) $("html").toggleClass("menu-open");
    }));
    var burger = $(".menu__icon");
    var menu = $(".menu__body");
    burger.click((function() {
        menu.toggleClass("active");
    }));
    $(document).ready((function() {
        var customSelect = $(".custom-select");
        customSelect.each((function() {
            var thisCustomSelect = $(this), options = thisCustomSelect.find("option"), firstOptionText = options.first().text();
            var selectedItem = $("<div></div>", {
                class: "selected-item"
            }).appendTo(thisCustomSelect).text(firstOptionText);
            var allItems = $("<div></div>", {
                class: "all-items all-items-hide"
            }).appendTo(thisCustomSelect);
            options.each((function() {
                var that = $(this), optionText = that.text();
                $("<div></div>", {
                    class: "item",
                    on: {
                        click: function() {
                            var selectedOptionText = that.text();
                            selectedItem.text(selectedOptionText).removeClass("arrowanim");
                            allItems.addClass("all-items-hide");
                        }
                    }
                }).appendTo(allItems).text(optionText);
            }));
        }));
        var selectedItem = $(".selected-item"), allItems = $(".all-items");
        selectedItem.on("click", (function(e) {
            var currentSelectedItem = $(this), currentAllItems = currentSelectedItem.next(".all-items");
            allItems.not(currentAllItems).addClass("all-items-hide");
            selectedItem.not(currentSelectedItem).removeClass("arrowanim");
            currentAllItems.toggleClass("all-items-hide");
            currentSelectedItem.toggleClass("arrowanim");
            e.stopPropagation();
        }));
        $(document).on("click", (function() {
            var opened = $(".all-items:not(.all-items-hide)"), index = opened.parent().index();
            customSelect.eq(index).find(".all-items").addClass("all-items-hide");
            customSelect.eq(index).find(".selected-item").removeClass("arrowanim");
        }));
    }));
    window["FLS"] = true;
    isWebp();
})();