(function() {
    'use strict';
    var $button = document.querySelectorAll('.privacy-dismiss')[0];

    var dismissed = Cookies.get('privacy-dismiss');
    if (!dismissed){
        $(".privacy").show();
    }

    $button.addEventListener('click', function(event){
        event.stopPropagation();
        event.preventDefault();
        $(".privacy").hide();
        Cookies.set('privacy-dismiss', true, {expires: 3650});
    });

})();
