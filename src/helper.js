exports.isRTL = isRTL

function isRTL(locale) {
    return ['ar', 'fa', 'iw', 'yi', 'ur', 'pa'].indexOf(locale) > -1
}
