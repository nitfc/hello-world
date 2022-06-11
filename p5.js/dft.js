///
/// DFT（離散フーリエ変換）
///
/// x: 信号

function dft(x, dt = 1) {
    const N = x.length;
    let re = [N], im =[N], amp = [N], ph = [N];

    for (let i = 0; i < N; i++) {
        let re_sum = 0;
        let im_sum = 0;
        for (let j = 0; j < N; j++) {
            let w = 2 * Math.PI / N * i * j;
            re_sum += x[j] * Math.cos(w);
            im_sum += x[j] * Math.sin(w);
        }
        re[i] = re_sum / N;
        im[i] = im_sum / N;
        amp[i] = sqrt(re[i] * re[i] + im[i] * im[i]);
        ph[i] = Math.atan2(im[i], re[i]);
    }
    return {Re: re, Im: im, Amplitude: amp, Phase: ph, df: 1 / (dt * N)};
}

/*
function fft(x) {
    const N = x.length;
    let iter = 0, xp, xp2;
    let w, wr, wri;

    let ar = [], ai = [];
    let amp = [];

    let i = N;
    while ((i /= 2) >= 1)	iter++;

    w = Math.PI / N;
    xp2 = N;
    for (let it = 0; it < iter; it++) {
        xp = xp2;
        xp2 /= 2;
        w *= 2;
        for (let k = 0, i = -xp; k < xp2; i++, k++) {
            let a = w * k;
            wr = Math.cos(a);
            wi = Math.sin(a);
            for (let j = xp; j <= N; j += xp) {
                let j1 = j + i;
                let j2 = j1 + xp2;
                let tr = x[j1] - x[j2];
                let ti = 0;
                ar[j1] = x[j1] + x[j2];
                ai[j1] = 0;
                ar[j2] = tr * wr - ti * wi;
                ai[j2] = ti * wr + tr * wi;
            }
        }
    }

    let j = N / 2;
    // let j1 = j;
    for (i = 0; i < N - 1; i++) {
        if (i < j)
		{
			w = ar[i];
			ar[i] = ar[j];
			ar[j] = w;
			w = ai[i];
			ai[i] = ai[j];
			ai[j] = w;
		}
		let k = N / 2;
		while (k <= j)
		{
			j -= k;
			k /= 2;
		}
		j += k;
    }

    for (i = 0; i < N; i++) {
        amp[i] = Math.sqrt(ar[i] * ar[i] + ai[i] * ai[i]);
    }

    return amp;
}
*/