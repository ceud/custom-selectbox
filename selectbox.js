var Selectbox = {
    initialization: function() {
        jQuery("SELECT").each(function(){
            if (jQuery(this).attr('id') != "timezone" && jQuery(this).attr('id') != "language") {
                var e = this;
                var selectOptions = Selectbox.getOptions(e);
                jQuery(this).hide();

                var divSelect = "<div class='select_menu' data-select-id='" + jQuery(this).attr('id') + "'>\n" + Selectbox.addDivSelect(selectOptions) + "\n</div>";
                jQuery(divSelect).insertBefore(this);
            }
        });

        jQuery(".menu_select").each(function(){
            jQuery(this).hide();
        });

        jQuery(".menu_selected").click(function(){
            if (jQuery(this).siblings(".menu_select").is(":visible")) {
                jQuery(this).siblings(".menu_select").hide();
                jQuery(this).removeClass("open");
            }
            else {
                jQuery(this).siblings(".menu_select").show();
                jQuery(this).addClass("open");
            }
        });

        jQuery(".menu_option").click(function(){
            //set selected to current element values (and set select...)
            jQuery(this).parent(".menu_select").siblings(".menu_selected").text(jQuery(this).text());
            jQuery(this).parent(".menu_select").siblings(".menu_selected").attr("data-option-value", jQuery(this).attr('data-option-value'));
            jQuery(this).parent(".menu_select").siblings(".menu_selected").removeClass("open");
            jQuery(this).parent(".menu_select").hide();

            //updates hidden select element with chosen option
            var selectID = "#" + jQuery(this).parent('.menu_select').parent('.select_menu').attr('data-select-id');
            var selectValue = jQuery(this).parent(".menu_select").siblings(".menu_selected").attr("data-option-value");
            jQuery(selectID).find("option[selected='SELECTED']").removeAttr("selected")
            jQuery(selectID).find("option[value='"+selectValue+"']").attr("selected", "SELECTED")
        });
    },

    getOptions: function(selectbox) {
        var optionsIndex = 0;
        var options = new Array();
        var selectedValue = jQuery(selectbox).val();
        var selectedBool = false;
        jQuery(selectbox).children("option").each(function() {
            var selectOption = this;
            selectedBool = false;
            if (selectedValue  == jQuery(selectOption).val()) {
                selectedBool = true;
            }
            options[optionsIndex] = new Array(jQuery(selectOption).val(), jQuery(selectOption).text(), selectedBool);
            optionsIndex++;
        });
        return options;
    },

    addDivSelect: function(selectOptions) {
        var divMenuOptions = "";
        var selectedText = "";
        for (var i = 0; i < selectOptions.length; i++) {
            if (selectOptions[i][2]) {
                selectedText = "<div class='menu_selected' data-option-value='" + selectOptions[i][0] + "'>" + selectOptions[i][1] + "</div>";
            }
            divMenuOptions = divMenuOptions + "<div class='menu_option' data-option-value='" + selectOptions[i][0] + "' data-option-selected='" + selectOptions[i][2] + "'>" + selectOptions[i][1] + "</div>\n";
        }
        return selectedText + "\n<div class='menu_select'>\n" + divMenuOptions + "</div>";
    }
}
