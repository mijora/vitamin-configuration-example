function init() {
  var scriptPram = document.getElementById("load_widget");
  var id = scriptPram.getAttribute("data-id");
  var key = scriptPram.getAttribute("data-key");
  var hide_add_to_cart = scriptPram.getAttribute("data-add_to_cart");
  var locale = scriptPram.getAttribute("data-locale");
  var currency = scriptPram.getAttribute("data-currency");
  var title = scriptPram.getAttribute("data-title");
  var src = scriptPram.getAttribute("src");
  var domain_url = src.replace("/embed.js", "");

  var iframe = document.createElement("iframe");
  if (locale && locale.length > 0) {
    iframe.src =
      domain_url +
      "/" +
      locale +
      "/products/" +
      id +
      "/product_iframe?key=" +
      key +
      "&title=" +
      title +
      "&currency=" +
      currency +
      "&hide_add_to_cart" +
      hide_add_to_cart;
  } else {
    iframe.src =
      domain_url +
      "/products/" +
      id +
      "/product_iframe?key=" +
      key +
      "&title=" +
      title +
      "&currency=" +
      currency;
  }

  iframe.style.width = "1px";
  iframe.style.height = "500px";
  iframe.style.border = "0";
  iframe.scrolling = "no";
  iframe.allowfullscreen = "true";
  iframe.id = "ifrm";

  document.getElementById("frame").appendChild(iframe);

  $("#ifrm").css("min-width", "100%");
  $("#ifrm").css("max-width", "100%");

  var oldSize = "100px";
  iFrameResize(
    {
      log: false,
      checkOrigin: false,
      sizeWidth: false,
      heightCalculationMethod: "taggedElement",
      messageCallback: function (messageData) {
        if (messageData.message == "fullscreen") {
          oldSize = $(messageData.iframe).css("height");
          $(messageData.iframe).css("position", "absolute");
          $(messageData.iframe).css("width", "100vw");
          setTimeout(function () {
            $(messageData.iframe).css("height", "100vh");
          }, 10);

          $(messageData.iframe).css("top", "0");
          $(messageData.iframe).css("bottom", "0");
          $(messageData.iframe).css("left", "0");
          $(messageData.iframe).css("right", "0");
          $(messageData.iframe).css("z-index", "999999999");
        } else if (messageData.message == "exitfullscreen") {
          $(messageData.iframe).css("position", "inherit");
          $(messageData.iframe).css("width", "1px");
          $(messageData.iframe).css("height", oldSize);
          $(messageData.iframe).css("top", "");
          $(messageData.iframe).css("bottom", "");
          $(messageData.iframe).css("left", "");
          $(messageData.iframe).css("right", "");
          $(messageData.iframe).css("z-index", "");
        }
      },
    },
    "#ifrm"
  );

  win = document.getElementById("ifrm").contentWindow;
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
