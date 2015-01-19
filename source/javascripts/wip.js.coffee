$ ->
  hljs.initHighlightingOnLoad()

  $('#editor').change ->
    $('#code code').text($(@).val())
    hljs.highlightBlock($('#code code')[0])

    $.get('/stylesheets/wip.css').complete (r) ->
      width  = $('#code').width()
      height = $('#code').height()
      $('#canvas').width(width)
      $('#canvas').height(height)

      data = "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>" +
             "<foreignObject width='100%' height='100%'>" +
             '<div xmlns="http://www.w3.org/1999/xhtml">' +
             '<style type="text/css" >' +
             '<![CDATA[' +
             r.responseText +
             ']]>' +
             '</style>' +
             $('#code').html() +
             '</div>' +
             '</foreignObject>' +
             '</svg>'

      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')
      ctx.canvas.width  = width
      ctx.canvas.height = height
      DOMURL = window.URL || window.webkitURL || window

      img = new Image()
      svg = new Blob([data], type: 'image/svg+xml;charset=utf-8')
      url = DOMURL.createObjectURL(svg)

      img.onload = ->
        ctx.drawImage(img, 0, 0)
        DOMURL.revokeObjectURL(url)

      img.src = url
