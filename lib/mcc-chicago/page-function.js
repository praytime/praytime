function pageFunction(context) {
    var $ = context.jQuery;
    var date = new Date();
    var result = { 
        results: [
            {
                name: "Muslim Community Center",
                url: "https://mccchicago.org",
                address: "4380 N. Elston Ave. Chicago, IL 60641",
                crawlTime: date,
                geo: {
                    latitude: 41.960308, 
                    longitude:-87.728960
                },
                fajrIqama: $( "div.prar-timming > ul > li:nth-child(2) > div.pull-right > div.time-r" ).first().text(),
                zuhrIqama: $( "div.prar-timming > ul > li:nth-child(3) > div.pull-right > div.time-r" ).first().text(),
                asrIqama: $( "div.prar-timming > ul > li:nth-child(4) > div.pull-right > div.time-r" ).first().text(),
                maghribIqama: $( "div.prar-timming > ul > li:nth-child(5) > div.pull-right > div.time-r" ).first().text(),
                ishaIqama: $( "div.prar-timming > ul > li:nth-child(6) > div.pull-right > div.time-r" ).first().text(),
                juma1: $( "body > div.elementor.elementor-7656 > div > div > section.elementor-element.elementor-element-d46fba2.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default.elementor-section.elementor-top-section > div > div > div.elementor-element.elementor-element-67c6f3d.elementor-column.elementor-col-33.elementor-top-column > div > div > div.elementor-element.elementor-element-6cd0d36.elementor-widget.elementor-widget-text-editor > div > div > p > span:nth-child(1)" ).text()
            },
            {
                name: "Muslim Education Center",
                url: "https://mccchicago.org",
                address: "8601 Menard Ave. Morton Grove, IL 60053",
                crawlTime: date,
                geo: {
                    latitude: 42.037729, 
                    longitude:-87.771120
                },
                fajrIqama: $( "div.prar-timming > ul > li:nth-child(2) > div.pull-right > div.time-l" ).first().text(),
                zuhrIqama: $( "div.prar-timming > ul > li:nth-child(3) > div.pull-right > div.time-l" ).first().text(),
                asrIqama: $( "div.prar-timming > ul > li:nth-child(4) > div.pull-right > div.time-l" ).first().text(),
                maghribIqama: $( "div.prar-timming > ul > li:nth-child(5) > div.pull-right > div.time-l" ).first().text(),
                ishaIqama: $( "div.prar-timming > ul > li:nth-child(6) > div.pull-right > div.time-l" ).first().text(),
                juma1: $( "body > div.elementor.elementor-7656 > div > div > section.elementor-element.elementor-element-d46fba2.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default.elementor-section.elementor-top-section > div > div > div.elementor-element.elementor-element-67c6f3d.elementor-column.elementor-col-33.elementor-top-column > div > div > div.elementor-element.elementor-element-6cd0d36.elementor-widget.elementor-widget-text-editor > div > div > p > span:nth-child(3)" ).text()
            }
        ]
    }; 
    return result; 
}
