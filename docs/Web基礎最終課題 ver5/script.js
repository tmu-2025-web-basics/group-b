// 波アニメーション初期化関数
function initWaveAnimation() {
    const wave = document.getElementById('wave-transition');
    const wavePath = document.getElementById('wave-path');
    if (!wave || !wavePath) return;

    // 各フレームの波形（Y座標のみ）
    const frames = [
        [100, 100, 100], // start
        [80, 80, 80],
        [60, 40, 60],
        [30, 0, 30],
        [0, -40, 0]      // end
    ];

    // 線形補間
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    let frame = 0;
    let progress = 0;
    const duration = 150; // ms per frame
    const steps = 20;     // steps per frame

    function animate() {
        if (frame >= frames.length - 1) {
            wave.style.opacity = 0;
            setTimeout(() => { wave.style.display = 'none'; }, 500);
            return;
        }
        progress++;
        const t = progress / steps;
        // 各制御点を補間
        const y0 = lerp(frames[frame][0], frames[frame+1][0], t);
        const y1 = lerp(frames[frame][1], frames[frame+1][1], t);
        const y2 = lerp(frames[frame][2], frames[frame+1][2], t);
        // SVGパスを生成
        const d = `M0,${y0} Q25,${y1} 50,${y2} T100,${y0} V100 H0 Z`;
        wavePath.setAttribute('d', d);

        if (progress < steps) {
            requestAnimationFrame(animate);
        } else {
            frame++;
            progress = 0;
            requestAnimationFrame(animate);
        }
    }

    // 初期表示
    wave.style.display = 'block';
    wave.style.opacity = 1;
    wavePath.setAttribute('d', 'M0,100 Q25,100 50,100 T100,100 V100 H0 Z');
    setTimeout(animate, 300);
}

// 波アニメーションを再生してからページ遷移する関数
function playWaveAnimationAndNavigate(targetUrl) {
    const wave = document.getElementById('wave-transition');
    const wavePath = document.getElementById('wave-path');
    if (!wave || !wavePath) {
        // 波アニメーション要素がない場合は直接遷移
        window.location.href = targetUrl;
        return;
    }

    // 各フレームの波形（Y座標のみ）
    const frames = [
        [100, 100, 100], // start
        [80, 80, 80],
        [60, 40, 60],
        [30, 0, 30],
        [0, -40, 0]      // end
    ];

    // 線形補間
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    let frame = 0;
    let progress = 0;
    const steps = 20;     // steps per frame (20から10に変更でアニメーション時間が半分に)

    function animate() {
        if (frame >= frames.length - 1) {
            // アニメーション終了後にページ遷移
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 200);
            return;
        }
        progress++;
        const t = progress / steps;
        
        // 全体の進行度を計算（0から1）
        const totalProgress = (frame + t) / (frames.length - 1);
        
        // 進行度に応じて不透明度を下げる（1から0.1へ）
        const opacity = 1 - (totalProgress * 1);
        wave.style.opacity = opacity;
        
        // 各制御点を補間
        const y0 = lerp(frames[frame][0], frames[frame+1][0], t);
        const y1 = lerp(frames[frame][1], frames[frame+1][1], t);
        const y2 = lerp(frames[frame][2], frames[frame+1][2], t);
        // SVGパスを生成
        const d = `M0,${y0} Q25,${y1} 50,${y2} T100,${y0} V100 H0 Z`;
        wavePath.setAttribute('d', d);

        if (progress < steps) {
            requestAnimationFrame(animate);
        } else {
            frame++;
            progress = 0;
            requestAnimationFrame(animate);
        }
    }

    // 波アニメーション開始
    wave.style.display = 'block';
    wave.style.opacity = 1;
    wavePath.setAttribute('d', 'M0,100 Q25,100 50,100 T100,100 V100 H0 Z');
    animate();
}// script.js
// 現在は特別なJavaScript処理はありませんが、
// ページの動的な操作やイベント処理を追加する場合はここに記述します。

// 例：ページ読み込み時の処理
// window.onload = function() {
//     // 初期化処理など
// }