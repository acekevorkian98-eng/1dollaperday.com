/**
 * Homepage only: starting-point finder, testing-desk tabs, hero ribbon.
 * Finder data comes from the scored reviews (Nov 2026). Unscored or
 * our own build (SnazzyPTC) is deliberately left out of recommendations.
 */
(function () {
    'use strict';

    // ---------------------------------------------------------------
    // Finder
    // ---------------------------------------------------------------
    var PLATFORMS = [
        { name: 'Prolific', url: 'reviews/prolific', score: 9.5, time: [5, 15, 30], tags: [], note: 'Academic surveys at fair rates. £6 or $6 to PayPal.' },
        { name: 'Freecash', url: 'reviews/freecash', score: 9.0, time: [15, 30], tags: ['quick'], note: 'Offerwalls with a $5 PayPal minimum, also crypto.' },
        { name: 'Swagbucks', url: 'reviews/swagbucks', score: 9.0, time: [15, 30], tags: ['quick'], note: 'Surveys and cashback. Gift cards from $3.' },
        { name: 'FaucetCrypto', url: 'reviews/faucetcrypto', score: 8.5, time: [30], tags: ['quick'], note: 'Level system, pays direct to your own wallet.' },
        { name: 'FaucetPay', url: 'reviews/faucetpay', score: 8.5, time: [5, 15], tags: ['quick', 'loweffort'], note: 'The micro-wallet most faucets pay into. Very low minimums.' },
        { name: 'FireFaucet', url: 'reviews/firefaucet', score: 8.0, time: [15, 30], tags: ['loweffort'], note: 'Earn fuel with daily tasks, then the cloud faucet claims for you.' },
        { name: 'RewardJoy', url: 'reviews/coinpayu', score: 8.0, time: [15, 30], tags: ['quick'], note: 'Ex-CoinPayU. $5 minimum, paid in about 2 days.' },
        { name: 'VieFaucet', url: 'reviews/viefaucet', score: 8.0, time: [15, 30], tags: ['quick'], note: 'Multi-coin faucet with a very low minimum.' },
        { name: 'Honeygain', url: 'reviews/honeygain', score: 8.0, time: [5, 15, 30], tags: ['loweffort'], note: 'Install once and it runs. $20 PayPal minimum.' }
    ];

    var finder = document.getElementById('finder');
    if (finder) {
        var list = finder.querySelector('.finder-results ol');
        var box = finder.querySelector('.finder-results');
        finder.addEventListener('submit', function (e) {
            e.preventDefault();
            var time = parseInt((finder.querySelector('input[name="time"]:checked') || {}).value || '15', 10);
            var want = (finder.querySelector('input[name="want"]:checked') || {}).value || 'nodeposit';
            var picks = PLATFORMS.filter(function (p) { return p.time.indexOf(time) !== -1; })
                .map(function (p) {
                    var fit = want === 'nodeposit' ? 1 : (p.tags.indexOf(want) !== -1 ? 2 : 0);
                    return { p: p, rank: fit * 10 + p.score };
                })
                .filter(function (x) { return want === 'nodeposit' || x.rank >= 20; })
                .sort(function (a, b) { return b.rank - a.rank; })
                .slice(0, 3);
            list.innerHTML = '';
            if (!picks.length) {
                list.innerHTML = '<li><a href="reviews/"><strong>Nothing fits that exactly</strong><small>Browse every review instead.</small></a></li>';
            }
            picks.forEach(function (x) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = x.p.url;
                a.innerHTML = '<strong></strong><small></small><em></em>';
                a.querySelector('strong').textContent = x.p.name;
                a.querySelector('small').textContent = x.p.note;
                a.querySelector('em').textContent = x.p.score + '/10';
                li.appendChild(a);
                list.appendChild(li);
            });
            box.classList.add('show');
            if (typeof gtag === 'function') {
                gtag('event', 'finder_search', { time_minutes: time, looking_for: want });
            }
        });
    }

    // ---------------------------------------------------------------
    // Testing desk tabs
    // ---------------------------------------------------------------
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.desk-tabs [role="tab"]'));
    function selectTab(tab) {
        tabs.forEach(function (t) {
            var on = t === tab;
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
            var panel = document.getElementById(t.getAttribute('aria-controls'));
            if (panel) panel.hidden = !on;
        });
    }
    tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { selectTab(tab); });
        tab.addEventListener('keydown', function (e) {
            var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (!d) return;
            var next = tabs[(i + d + tabs.length) % tabs.length];
            selectTab(next);
            next.focus();
        });
    });

    // ---------------------------------------------------------------
    // Hero ribbon: layered silk strands drawn on canvas
    // ---------------------------------------------------------------
    var canvas = document.querySelector('.hp-ribbon');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W = 0, H = 0, dpr = 1, running = true, raf = 0;

    function resize() {
        var r = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = r.width; H = r.height;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    var RIBBONS = [
        { strands: 140, width: 0.78, offset: 0.0, lift: 0.0, alpha: 1.0, speed: 1.0 },
        { strands: 70, width: 0.30, offset: 2.1, lift: 0.22, alpha: 0.6, speed: 0.8 }
    ];
    var SEG = 90;

    function draw(t) {
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineWidth = 1.1;
        for (var r = 0; r < RIBBONS.length; r++) {
            var R = RIBBONS[r];
            var time = t * 0.00018 * R.speed;
            for (var s = 0; s <= R.strands; s++) {
                var v = s / R.strands - 0.5;
                var edge = 1 - Math.abs(v) * 2;
                var sheen = 0.035 + 0.30 * Math.pow(1 - edge, 5) + 0.06 * Math.pow(edge, 0.6);
                ctx.beginPath();
                for (var i = 0; i <= SEG; i++) {
                    var u = i / SEG;
                    var cx = W * (0.02 + 1.0 * u);
                    var cy = H * (0.98 - 0.95 * u - R.lift) + Math.sin(u * Math.PI * 1.5 + time * 2 + R.offset) * H * 0.10;
                    var twist = u * Math.PI * 1.15 + time * 2.6 + R.offset + 0.6;
                    var w = H * R.width * (0.25 + 0.75 * Math.sin(Math.PI * Math.min(1, u * 1.08)));
                    var ang = -1.05 + 0.5 * Math.sin(u * 2.2 + time);
                    var off = v * w * Math.cos(twist);
                    var depth = v * w * Math.sin(twist);
                    var x = cx + Math.cos(ang) * off + depth * 0.22;
                    var y = cy + Math.sin(ang) * off - depth * 0.08;
                    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                var l = 62 + 22 * (1 - edge);
                ctx.strokeStyle = 'hsla(218, 95%, ' + l + '%, ' + (sheen * R.alpha).toFixed(3) + ')';
                ctx.stroke();
            }
        }
        ctx.globalCompositeOperation = 'source-over';
    }

    function loop(t) {
        if (!running) return;
        draw(t);
        raf = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', function () { resize(); if (reduce) draw(4000); });
    if (reduce) {
        draw(4000);
    } else {
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                running = entries[0].isIntersecting;
                cancelAnimationFrame(raf);
                if (running) raf = requestAnimationFrame(loop);
            }).observe(canvas);
        }
        raf = requestAnimationFrame(loop);
    }
})();
