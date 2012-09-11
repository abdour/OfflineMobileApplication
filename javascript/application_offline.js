
var BootStrapper = function () {
    var self = this;
    function hasClass(ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
    function addClass(ele, cls) {
        if (!hasClass(ele, cls)) ele.className += " " + cls;
    }
    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    }
    this.onlineEventSupported = true;
    this.isOnline = true;
    this.onConnectionLost = function () {
        self.isOnline = false;
        var reloadButton = document.getElementsByTagName("a")[0];
        addClass(reloadButton, "offline-button");
        removeClass(reloadButton, "online-button");
        reloadButton.innerHTML = "Offline";
    };
    this.onConnectionEstablished = function () {
        var reloadButton = document.getElementsByTagName("a")[0];
        self.isOnline = true;
        addClass(reloadButton, "online-button");
        removeClass(reloadButton, "offline-button");
        reloadButton.innerHTML = "Online";
    };

    this.bindConnectionEvents = function () {
        var online = navigator.onLine;
        if (online == undefined) {
            this.onlineEventSupported = false;
            //to do a simple  ajax call to test connection
        } else {
            self.isOnline = online;
            window.addEventListener("online", self.onConnectionEstablished, false);
            window.addEventListener("offline", self.onConnectionLost, false);
        }
    };

    this.initializeApplication = function () {
        window.onload = function () {
            self.bindConnectionEvents();
            if (self.onlineEventSupported == true) {
                var online = self.isOnline ? "Online" : "Offline";
                var onlineClass= self.isOnline ? " online-button" : " offline-button";
                var content = '<h1>No Connection <span>:(</span></h1>';
                content += '<p class="description">Sorry, no internet connection,please retry to';
                content += 'load the application after fixing the internet connection problem</p>';
                content += '<div class="cta-option"><a class="btn-reload '+ onlineClass + '" href="">';
                content += '<strong>' + online + '</strong><span class="version"></span></a></div>';
                var div = document.createElement('div');
                div.className = "container";
                div.innerHTML = content;
                var bodyContent = document.getElementsByTagName("body")[0];
                bodyContent.appendChild(div);

            } else {
                //do an alert in this case
            }
        };

    };

};
var boot = new BootStrapper();
boot.initializeApplication();
