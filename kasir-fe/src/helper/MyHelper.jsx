// MyHelper.js

export function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'narrowSymbol', // This will narrow the currency symbol (if the browser supports it)
        maximumSignificantDigits: 10, // To ensure two significant digits
    })
        .format(price)
        .replace('Rp', '') // Replace the currency symbol
}
export function terbilangFormat(n) {
    const bilangan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas']

    if (n < 12) {
        return bilangan[n]
    } else if (n < 20) {
        return bilangan[n % 10] + ' belas'
    } else if (n < 100) {
        return bilangan[Math.floor(n / 10)] + ' puluh ' + bilangan[n % 10]
    } else if (n < 200) {
        return 'seratus ' + terbilangFormat(n % 100)
    } else if (n < 1000) {
        return bilangan[Math.floor(n / 100)] + ' ratus ' + terbilangFormat(n % 100)
    } else if (n < 2000) {
        return 'seribu ' + terbilangFormat(n % 1000)
    } else if (n < 1000000) {
        return terbilangFormat(Math.floor(n / 1000)) + ' ribu ' + terbilangFormat(n % 1000)
    } else if (n < 1000000000) {
        return terbilangFormat(Math.floor(n / 1000000)) + ' juta ' + terbilangFormat(n % 1000000)
    }

    // Menambahkan lebih banyak aturan untuk angka yang lebih besar

    return 'Angka terlalu besar'
}

export function subtract(a, b) {
    return a - b
}

export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatDate(inputDate) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    // Convert the string date to a JavaScript Date object
    const date = new Date(inputDate)
    return date.toLocaleDateString('en-GB', options) // 'en-GB' specifies British English locale
}
export function formatDateNow(inputDate) {
    const options = { day: '2-digit' }
    // Convert the string date to a JavaScript Date object
    const date = new Date(inputDate)
    return date.toLocaleDateString('en-GB', options) // 'en-GB' specifies British English locale
}
export function formatRupiah(angka) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi)

    // tambahkan titik jika yang di input sudah menjadi angka satuan ribuan
    if (ribuan) {
        var separator = sisa ? '.' : ''
        rupiah += separator + ribuan.join('.')
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
    return rupiah
}
