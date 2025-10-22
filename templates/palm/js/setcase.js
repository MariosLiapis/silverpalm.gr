(function(jQuery) {



jQuery.extend(jQuery.expr[":"], {

  uppercase: function(elem) {

    var attr = jQuery(elem).css("text-transform");

    return (typeof attr !== "undefined" && attr === "uppercase");

    },

  smallcaps: function(elem) {

    var attr = jQuery(elem).css("font-variant");

    return (typeof attr !== "undefined" && attr === "small-caps");

  }

});



jQuery.extend({

  removeAcc: function(elem) {

    var text = (elem.tagName.toLowerCase() == "input") ? elem.value : elem.innerHTML;



    text = text.replace(/Ά/g, "Α");
    text = text.replace(/ά/g, "α");
    text = text.replace(/Έ/g, "Ε");
    text = text.replace(/έ/g, "ε");
    text = text.replace(/Ή/g, "Η");
    text = text.replace(/ή/g, "η");
    text = text.replace(/Ί/g, "Ι");
    text = text.replace(/ί/g, "ι");
    text = text.replace(/ΐ/g, "ϊ");
    text = text.replace(/Ό/g, "Ο");
    text = text.replace(/ό/g, "ο");
    text = text.replace(/Ύ/g, "Υ");
    text = text.replace(/ύ/g, "υ");
    text = text.replace(/ΰ/g, "ϋ");
    text = text.replace(/Ώ/g, "Ω");
    text = text.replace(/ώ/g, "ω");



    (elem.tagName.toLowerCase() == "input") ? (elem.value = text) : (elem.innerHTML = text);

  }

});



jQuery.fn.extend({

  removeAcc: function() {

    return this.each(function() {

      jQuery.removeAcc(this);

    });

  }

});



})(jQuery);



jQuery(document).ready(function($) {

  $(":uppercase, :smallcaps").removeAcc();

  $(document).ajaxComplete(function(event, request, settings) {

    $(":uppercase, :smallcaps").removeAcc();

  });

});

