(function() {
    'use strict';
    /* Add ajax functionalities to a form marked with data-ajax-form
       data-form-submit, data-form-success and data-form-error can be used
       to specify submit button, success and error message */

    function sendForm(form, formName, submit) {
        /* Send a form */
        window.setTimeout(function() {
            $('[data-form-error="'+ formName+'"]').hide();
            submit.disabled = false;

            $.ajax({
                type: "POST",
                url: form.dataset.url,
                data: $('[data-ajax-form="'+formName+'"]').serialize(),
                dataType: "json",
                success: function(data) {
                    $('[data-ajax-form="'+formName+'"]').hide();
                    $('[data-form-success="'+ formName+'"]').show();
                },
                error: function(data, status, error){
                    form.reset();
                    $('[data-form-error="'+ formName+'"]').show();
                }
            });
        }, 750);
    }

    var formName, buttonName, i, form, submit;
    var forms = $('[data-ajax-form]');

    for (i = 0; i < forms.length; i++) {
        form = forms[i];
        formName = form.dataset.ajaxForm;
        buttonName = '[data-form-submit="'+ formName + '"]';
        submit = document.querySelectorAll(buttonName)[0];

        if (submit) {
            form.addEventListener('submit', function(event) {
                event.stopPropagation();
                event.preventDefault();
                submit.disabled = true;
                sendForm(form, formName, submit);
            });
        }
    }

})();
