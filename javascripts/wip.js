(function() {
  $(function() {
    $('#code code').text($('#editor').val());
    hljs.initHighlightingOnLoad();
    $('#editor').on('change keyup', function() {
      $('#code code').text($(this).val());
      return hljs.highlightBlock($('#code code')[0]);
    });
    return $('#button').click(function() {
      return $.get('/stylesheets/wip.css').complete(function(r) {
        var DOMURL, canvas, ctx, data, height, img, scale, svg, url, width;
        scale = 2;
        width = $('#code').width() * scale;
        height = $('#code').height() * scale;
        data = ("<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'>") + "<foreignObject width='100%' height='100%'>" + '<div xmlns="http://www.w3.org/1999/xhtml">' + '<style type="text/css" >' + '<![CDATA[' + r.responseText + ']]>' + '</style>' + $('#code').html() + '</div>' + '</foreignObject>' + '</svg>';
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.scale(scale, scale);
        DOMURL = window.URL || window.webkitURL || window;
        img = new Image();
        svg = new Blob([data], {
          type: 'image/svg+xml;charset=utf-8'
        });
        url = DOMURL.createObjectURL(svg);
        img.onload = function() {
          ctx.drawImage(img, 0, 0);
          return DOMURL.revokeObjectURL(url);
        };
        return img.src = url;
      });
    });
  });

}).call(this);
