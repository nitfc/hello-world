///
/// N次元ルンゲクッタ
///
/// der: 導関数の配列 func(t, x1, x2, ..., xN)
/// x0:  初期値の配列
/// dt:  時間ステップ
/// n:   繰り返し回数
/// 返り値: a[t][x]
///
function RungeKutta(der, x0, dt, n) {
    const N = der.length;
    let x = [N];
    let a = [n];
    let k1 = [N], k2 = [N], k3 = [N], k4 = [N];

    //  ルンゲクッタの引数を計算する内部関数
    function lc(x1, c2, x2) { 
        let res = [];
        for (let i = 0; i < x1.length; i++) { res[i] = x1[i] + c2 * x2[i]; }
        return res;
    }

    //  初期値（t = 0）の値の入力
    for (let j = 0; j < N; j++) {
        x[j] = x0[j];
    }

    //  返り値aにxを"コピー"
    a[0] = x.concat();

    //  時間進行ループ
    for (let i = 1; i < n; i++) {
        let t = dt * i;

        //  k1の計算
        for (let j = 0; j < N; j++) {
            k1[j] = dt * der[j](t, x);
        }

        //  k2の計算
        for (let j = 0; j < N; j++) {
            k2[j] = dt * der[j](t + 0.5 * dt, lc(x, 0.5, k1));
        }

        //  k3の計算
        for (let j = 0; j < N; j++) {
            k3[j] = dt * der[j](t + 0.5 * dt, lc(x, 0.5, k2));
        }

        //  k4の計算
        for (let j = 0; j < N; j++) {
            k4[j] = dt * der[j](t + dt, lc(x, 1.0, k3));
        }

        //  xの計算
        for (let j = 0; j < N; j++) {
            x[j] += (k1[j] + 2.0 * k2[j] + 2 * k3[j] + k4[j]) / 6.0;
        }

        //  計算されたxの値を返り値aに"コピー"
        a[i] = x.concat();
    }

    return a;
}


function RungeKutta2({dxdt, d2xdt2, x0, v0, dt, n}) {
    let x, v;
    let ax = new Array(n);
    let av = new Array(n);
    let k1 = [0, 0], k2 = [0, 0], k3 = [0, 0], k4 = [0, 0];

    x = ax[0] = x0;
    v = av[0] = v0;

    for (let i = 1; i < n; i++) {
        t = dt * i;

        k1[0] = dt * dxdt(t, x, v);
        k1[1] = dt * d2xdt2(t, x, v);

        k2[0] = dt * dxdt(t + 0.5 * dt, x + 0.5 * k1[0], v + 0.5 * k1[1]);
        k2[1] = dt * d2xdt2(t + 0.5 * dt, x + 0.5 * k1[0], v + 0.5 * k1[1]);

        k3[0] = dt * dxdt(t + 0.5 * dt, x + 0.5 * k2[0], v + 0.5 * k2[1]);
        k3[1] = dt * d2xdt2(t + 0.5 * dt, x + 0.5 * k2[0], v + 0.5 * k2[1]);

        k4[0] = dt * dxdt(t + dt, x + k3[0], v + k3[1]);
        k4[1] = dt * d2xdt2(t + dt, x + k3[0], v + k3[1]);

        x += (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6;
        v += (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6;

        ax[i] = x;
        av[i] = v;
    }

    return {x: ax, v: av};
}

