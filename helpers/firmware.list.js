module.exports = new (function() {

    var regions = {
        'E' : {},
        'U' : {},
        'J' : {},
        'K' : {}
    }

    var NUPs_1 = {
        '7' : regions,
        '8' : regions,
        '9' : regions,
        '10' : regions,
        '11' : regions,
        '12' : regions,
        '13' : regions,
        '14' : regions,
        '15' : regions,
        '16' : regions,
        '17' : regions,
        '18' : regions,
        '19' : regions,
        '20' : regions,
        '21' : regions,
        '22' : regions,
        '23' : regions,
        '24' : regions,
        '25' : regions,
        '26' : regions,
        '27' : regions,
        '28' : regions,
        '29' : regions,
        '30' : regions,
        '31' : regions,
        '32' : regions,
        '33' : regions,
        '34' : regions,
        '35' : regions,
        '36' : regions,
        '37' : regions,
        '38' : regions,
        '39' : regions,
        '137' : regions,
        '999' : regions
    }

    var zeroMicro_1 = {
        '0' : NUPs_1
    }

    var oldOptions = {
        '9': {
            '0': zeroMicro_1,
            '1': zeroMicro_1,
            '2': zeroMicro_1,
            '3': zeroMicro_1,
            '4': zeroMicro_1,
            '5': zeroMicro_1,
            '6': zeroMicro_1,
            '7': zeroMicro_1,
            '8': zeroMicro_1,
            '9': zeroMicro_1
        },
        '10': {
            '0': zeroMicro_1,
            '1': zeroMicro_1,
            '2': zeroMicro_1,
            '3': zeroMicro_1,
            '4': zeroMicro_1,
            '5': zeroMicro_1,
            '6': zeroMicro_1,
            '7': zeroMicro_1
        },
        '11': {
            '0': zeroMicro_1,
            '1': zeroMicro_1,
            '2': zeroMicro_1
        }
    }

    var options = {
        'OLD': oldOptions,
        'NEW': oldOptions
    }

    return oldOptions;
});
