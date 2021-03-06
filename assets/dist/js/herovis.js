! function t(e, i, n) {
    function s(a, o) {
        if (!i[a]) {
            if (!e[a]) {
                var l = "function" == typeof require && require;
                if (!o && l) return l(a, !0);
                if (r) return r(a, !0);
                var u = new Error("Cannot find module '" + a + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var h = i[a] = {
                exports: {}
            };
            e[a][0].call(h.exports, function(t) {
                var i = e[a][1][t];
                return s(i || t)
            }, h, h.exports, t, e, i, n)
        }
        return i[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < n.length; a++) s(n[a]);
    return s
}({
    1: [function(t, e, i) {
        "use strict";
        var n = t("../loader"),
            s = t("./system");
        window.demoNum = 8;
        new n(s)
    }, {
        "../loader": 3,
        "./system": 2
    }],
    2: [function(t, e, i) {
        "use strict";
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            s = function t(e, i, n) {
                null === e && (e = Function.prototype);
                var s = Object.getOwnPropertyDescriptor(e, i);
                if (void 0 === s) {
                    var r = Object.getPrototypeOf(e);
                    return null === r ? void 0 : t(r, i, n)
                }
                if ("value" in s) return s.value;
                var a = s.get;
                if (void 0 !== a) return a.call(n)
            },
            r = t("../system-base"),
            a = t("../utils/osc"),
            o = function(t) {
                function e(t) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e);
                    var i = function(t, e) {
                        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !e || "object" != typeof e && "function" != typeof e ? t : e
                    }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                    i.duration = 9300, i.simplex = new FastSimplexNoise, i.color = new THREE.Color, i.texture = i.generateTexture(), i.size = 10, i.scale = 1, i.base = 20, i.count = i.base * i.base * i.base, i.geometry = new THREE.BufferGeometry, i.parts = [], i.positions = new Float32Array(3 * i.count), i.colors = new Float32Array(4 * i.count), i.sizes = new Float32Array(i.count), i.geometry.addAttribute("position", new THREE.BufferAttribute(i.positions, 3)), i.geometry.addAttribute("color", new THREE.BufferAttribute(i.colors, 4)), i.geometry.addAttribute("size", new THREE.BufferAttribute(i.sizes, 1));
                    for (var n = 0; n < i.count; n++) {
                        var s = i.calc.rand(.1, .8);
                        i.parts.push({
                            offset: 0,
                            position: new THREE.Vector3(i.calc.rand(-i.size / 2, i.size / 2), i.calc.rand(-i.size / 2, i.size / 2), i.calc.rand(-i.size / 2, i.size / 2)),
                            baseSize: s,
                            size: s,
                            r: 1,
                            g: 1,
                            b: 1,
                            a: 0,
                            life: 2,
                            decay: i.calc.rand(.05, .15),
                            firstRun: !0
                        })
                    }
                    return i.material = new THREE.ShaderMaterial({
                        uniforms: {
                            texture: {
                                type: "t",
                                value: i.texture
                            }
                        },
                        vertexShader: "\n\t\t\t\tattribute float size;\n\t\t\t\tattribute vec4 color;\n\t\t\t\tvarying vec4 vColor;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvColor = color;\n\t\t\t\t\tvec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n\t\t\t\t\tgl_PointSize = size * (300.0 / length(mvPosition.xyz));\n\t\t\t\t\tgl_Position = projectionMatrix * mvPosition;\n\t\t\t\t}\n\t\t\t",
                        fragmentShader: "\n\t\t\t\tuniform sampler2D texture;\n\t\t\t\tvarying vec4 vColor;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tgl_FragColor = vColor * texture2D(texture, gl_PointCoord);\n\t\t\t\t}\n\t\t\t",
                        blending: THREE.AdditiveBlending,
                        depthTest: !1,
                        transparent: !0
                    }), i.mesh = new THREE.Points(i.geometry, i.material), i.particleGroup.add(i.mesh), i.updateParticleAttributes(!0, !0, !0), i.osc = new a(0, .015, !0, !1), i.reset(), i
                }
                return function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }(e, r), n(e, [{
                    key: "reset",
                    value: function() {
                        this.osc.reset()
                    }
                }, {
                    key: "generateTexture",
                    value: function() {
                        var t = document.createElement("canvas"),
                            e = t.getContext("2d");
                        t.width = 128, t.height = 128;
                        var i = e.createRadialGradient(64, 64, 0, 64, 64, 51.2);
                        i.addColorStop(0, "hsla(0, 0%, 100%, 1)"), i.addColorStop(1, "hsla(0, 0%, 100%, 0)"), e.beginPath(), e.arc(64, 64, 64, 0, 2 * Math.PI), e.fillStyle = i, e.fill();
                        var n = new THREE.Texture(t);
                        return n.needsUpdate = !0, n
                    }
                }, {
                    key: "updateParticleAttributes",
                    value: function(t, e, i) {
                        for (var n = this.count; n--;) {
                            var s = this.parts[n];
                            t && (this.colors[4 * n + 0] = s.r, this.colors[4 * n + 1] = s.g, this.colors[4 * n + 2] = s.b, this.colors[4 * n + 3] = s.a), e && (this.positions[3 * n + 0] = s.position.x, this.positions[3 * n + 1] = s.position.y, this.positions[3 * n + 2] = s.position.z), i && (this.sizes[n] = s.size)
                        }
                        t && (this.geometry.attributes.color.needsUpdate = !0), e && (this.geometry.attributes.position.needsUpdate = !0), i && (this.geometry.attributes.size.needsUpdate = !0)
                    }
                }, {
                    key: "replay",
                    value: function() {
                        s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replay", this).call(this), this.reset()
                    }
                }, {
                    key: "update",
                    value: function() {
                        s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "update", this).call(this), this.osc.update(this.loader.deltaTimeNormal), this.oscEased = this.osc.val(this.ease.inOutExpo);
                        for (var t = this.count, i = 8e-4 * this.loader.elapsedMilliseconds, n = this.calc.map(this.oscEased, 0, 1, 0, 1); t--;) {
                            var r = this.parts[t],
                                a = .1 * r.position.x,
                                o = .1 * r.position.y,
                                l = .1 * r.position.z,
                                u = .5 * this.simplex.getRaw4DNoise(a, o, l, i) + .5,
                                h = .5 * this.simplex.getRaw4DNoise(a + 100, o + 100, l + 100, 50 + i) + .5,
                                c = .5 * this.simplex.getRaw4DNoise(a + 200, o + 200, l + 200, 100 + i) + .5;
                            if (r.position.x += Math.sin(u * Math.PI * 2) * n * this.loader.deltaTimeNormal, r.position.y += Math.sin(h * Math.PI * 2) * n * this.loader.deltaTimeNormal, r.position.z += Math.sin(c * Math.PI * 2) * n * this.loader.deltaTimeNormal, r.life > 0 && (r.life -= r.decay * this.oscEased * this.loader.deltaTimeNormal), r.life <= 0 || r.firstRun) {
                                r.life = 2, r.position.x = this.calc.rand(-this.size / 2, this.size / 2), r.position.y = this.calc.rand(-this.size / 2, this.size / 2), r.position.z = this.calc.rand(-this.size / 2, this.size / 2);
                                var d = (this.loader.elapsedMilliseconds / 25 + this.calc.rand(90)) % 360 + 110,
                                    f = Math.round(this.calc.rand(10, 50));
                                this.color.set("hsl(" + d + ", 85%, " + f + "%)"), r.r = this.color.r, r.g = this.color.g, r.b = this.color.b, r.firstRun = !1
                            }
                            r.a = r.life > 1 ? 2 - r.life : r.life, r.size = this.calc.map(this.oscEased, 0, 1, 4 * r.baseSize, 1 * r.baseSize)
                        }
                        this.updateParticleAttributes(!0, !0, !0), this.particleGroup.rotation.y += (.0075 + .04 * this.oscEased) * this.loader.deltaTimeNormal, this.particleGroup.position.z = 5 - 15 * this.oscEased, !this.exiting || this.loader.isOrbit || this.loader.isGrid || (this.loader.camera.position.z = this.loader.cameraBaseZ - this.ease.inExpo(this.exitProgress, 0, 1, 1) * this.loader.cameraBaseZ)
                    }
                }]), e
            }();
        e.exports = o
    }, {
        "../system-base": 4,
        "../utils/osc": 8
    }],
    3: [function(t, e, i) {
        "use strict";
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            s = t("./utils/calc"),
            r = t("./utils/ease"),
            a = t("./utils/axis"),
            o = function() {
                function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.calc = new s, this.ease = new r, this.dom = {
                        html: document.documentElement,
                        container: document.querySelector(".loader"),
                        timescaleWrap: document.querySelector(".timescale-wrap"),
                        timescaleRange: document.querySelector(".timescale-range"),
                        timescaleValue: document.querySelector(".timescale-value"),
                        replayButton: document.querySelector(".replay-animation"),
                        debugButton: document.querySelector(".icon--debug")
                    }, this.dom.html.classList.add("loading"), this.completed = !1, this.raf = null, this.setupDebug(), this.setupTime(), this.setupScene(), this.setupCamera(), this.setupRenderer(), this.setupControls(), this.setupHelpers(), this.listen(), this.onResize(), this.system = new e(this), this.loop()
                }
                return n(t, [{
                    key: "setupDebug",
                    value: function() {
                        var t = this;

                        this.isGrid = "grid";
                        this.isOrbit = "orbit";

                        // this.isDebug = location.hash.indexOf("debug") > 0, this.isGrid = location.hash.indexOf("grid") > 0, this.isOrbit = location.hash.indexOf("orbit") > 0, this.debugHash = "", this.isDebug ? (this.isGrid = !0, this.isOrbit = !0, this.debugHash += "debug", this.dom.html.classList.add("is-debug")) : (this.debugHash += this.isGrid ? "grid" : "", this.debugHash += this.isOrbit ? "orbit" : ""), this.debugHash && [].slice.call(document.querySelectorAll(".demo")).forEach(function(e, i, n) {
                        //     e.setAttribute("href", e.getAttribute("href") + "#" + t.debugHash)
                        // })
                    }
                }, {
                    key: "setupTime",
                    value: function() {
                        this.timescale = 1, this.clock = new THREE.Clock, this.deltaTimeSeconds = this.clock.getDelta() * this.timescale, this.deltaTimeMilliseconds = 1e3 * this.deltaTimeSeconds, this.deltaTimeNormal = this.deltaTimeMilliseconds / (1e3 / 60), this.elapsedMilliseconds = 0
                    }
                }, {
                    key: "setupScene",
                    value: function() {
                        this.scene = new THREE.Scene
                    }
                }, {
                    key: "setupCamera",
                    value: function() {
                        this.camera = new THREE.PerspectiveCamera(100, 0, 1e-4, 1e4), this.cameraBaseX = this.isGrid ? -20 : 0, this.cameraBaseY = this.isGrid ? 15 : 0, this.cameraBaseZ = this.isGrid ? 20 : 30, this.camera.position.x = this.cameraBaseX, this.camera.position.y = this.cameraBaseY, this.camera.position.z = this.cameraBaseZ
                    }
                }, {
                    key: "setupRenderer",
                    value: function() {
                        this.renderer = new THREE.WebGLRenderer({
                            alpha: !0,
                            antialias: !0
                        }), this.dom.container.appendChild(this.renderer.domElement)
                    }
                }, {
                    key: "setupControls",
                    value: function() {
                        this.isOrbit && (this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.dampingFactor = .2, this.controls.enableKeys = !1)
                    }
                }, {
                    key: "setupHelpers",
                    value: function() {
                        this.isGrid && (this.gridOpacityMap = [.4, .2, .2, .2, .1, .2, .1, .1], this.gridHelper = new THREE.GridHelper(300, 60, 16777215, 16777215), this.gridHelper.material.transparent = !0, this.gridHelper.material.opacity = this.gridOpacityMap[demoNum - 1], this.scene.add(this.gridHelper), this.axisOpacityMap = [1, .6, .6, .6, .3, .6, .3, .3], this.axisHelper = new a(150, this.axisOpacityMap[demoNum - 1]), this.scene.add(this.axisHelper), this.camera.lookAt(new THREE.Vector3))
                    }
                }, {
                    key: "update",
                    value: function() {
                        this.deltaTimeSeconds = this.clock.getDelta(), this.diffTime && (this.deltaTimeSeconds -= this.diffTime, this.diffTime = 0), this.deltaTimeSeconds *= this.timescale, this.deltaTimeMilliseconds = 1e3 * this.deltaTimeSeconds, this.deltaTimeNormal = this.deltaTimeMilliseconds / (1e3 / 60), this.elapsedMilliseconds += this.deltaTimeMilliseconds, this.system.update(), this.isOrbit && this.controls.update()
                    }
                }, {
                    key: "render",
                    value: function() {
                        this.renderer.render(this.scene, this.camera)
                    }
                }, {
                    key: "listen",
                    value: function() {
                        var t = this;
                        window.addEventListener("resize", function(e) {
                            return t.onResize(e)
                        }), this.hidden = null, this.visibilityChange = null, void 0 !== document.hidden ? (this.hidden = "hidden", this.visibilityChange = "visibilitychange") : void 0 !== document.msHidden ? (this.hidden = "msHidden", this.visibilityChange = "msvisibilitychange") : void 0 !== document.webkitHidden && (this.hidden = "webkitHidden", this.visibilityChange = "webkitvisibilitychange"), void 0 === document.addEventListener || void 0 === document.hidden || window.addEventListener(this.visibilityChange, function(e) {
                            return t.onVisibilityChange(e)
                        })
                    }
                }, {
                    key: "replay",
                    value: function() {
                        document.documentElement.classList.remove("completed"), document.documentElement.classList.add("loading"), this.camera.position.x = this.cameraBaseX, this.camera.position.y = this.cameraBaseY, this.camera.position.z = this.cameraBaseZ, this.timescale = 1, this.deltaTimeSeconds = 1 / 60, this.deltaTimeMilliseconds = 1e3 * this.deltaTimeSeconds, this.deltaTimeNormal = this.deltaTimeMilliseconds / (1e3 / 60), this.elapsedMilliseconds = 0, this.blurTime = 0, this.diffTime = 0, this.focusTime = 0, this.system.replay(), this.completed = !1, this.clock.start(), this.loop()
                    }
                }, {
                    key: "complete",
                    value: function() {
                        var t = this;
                        this.isOrbit || this.isGrid || (setTimeout(function() {
                            t.clock.stop(), cancelAnimationFrame(t.raf)
                        }, 600), this.completed = !0, this.dom.html.classList.remove("loading"), this.dom.html.classList.add("completed"))
                    }
                }, {
                    key: "onResize",
                    value: function() {
                        this.width = window.innerWidth, this.height = window.innerHeight, this.dpr = window.devicePixelRatio > 1 ? 2 : 1, this.camera.aspect = this.width / this.height, this.camera.updateProjectionMatrix(), this.renderer.setPixelRatio(this.dpr), this.renderer.setSize(this.width, this.height)
                    }
                }, {
                    key: "onReplayButtonClick",
                    value: function(t) {
                        t.preventDefault(), this.replay()
                    }
                }, {
                    key: "onDebugButtonClick",
                    value: function(t) {
                        t.preventDefault();
                        var e = window.location.href.split("#")[0];
                        this.isDebug ? (history ? history.pushState("", document.title, window.location.pathname) : location.hash = "", location.href = e) : location.href = e + "#debug", location.reload()
                    }
                }, {
                    key: "onTimescaleRangeChange",
                    value: function(t) {
                        this.timescale = parseFloat(this.dom.timescaleRange.value), this.dom.timescaleValue.innerHTML = this.timescale.toFixed(1)
                    }
                }, {
                    key: "onVisibilityChange",
                    value: function(t) {
                        document.hidden ? this.blurTime = Date.now() : (this.focusTime = Date.now(), this.blurTime && (this.diffTime = (this.focusTime - this.blurTime) / 1e3))
                    }
                }, {
                    key: "loop",
                    value: function() {
                        var t = this;
                        this.update(), this.render(), this.raf = window.requestAnimationFrame(function() {
                            return t.loop()
                        })
                    }
                }]), t
            }();
        e.exports = o
    }, {
        "./utils/axis": 5,
        "./utils/calc": 6,
        "./utils/ease": 7
    }],
    4: [function(t, e, i) {
        "use strict";
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            s = function() {
                function t(e) {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.loader = e, this.calc = this.loader.calc, this.ease = this.loader.ease, this.sphereGeometry = new THREE.SphereBufferGeometry(1, 16, 16), this.boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1), this.center = new THREE.Vector3, this.particles = [], this.particleGroup = new THREE.Object3D, this.particleGroup.scale.set(1e-4, 1e-4, 1e-4), this.loader.scene.add(this.particleGroup), this.entering = !0, this.enterProgress = 0, this.enterRate = .015, this.exiting = !1, this.exitProgress = 0, this.exitRate = .01, this.duration = 1 / 0
                }
                return n(t, [{
                    key: "update",
                    value: function() {
                        for (var t = this.particles.length; t--;) this.particles[t].update();
                        if (this.entering && this.enterProgress < 1) {
                            this.enterProgress += this.enterRate * this.loader.deltaTimeNormal, this.enterProgress > 1 && (this.enterProgress = 1, this.entering = !1);
                            var e = this.ease.inOutExpo(this.enterProgress, 0, 1, 1);
                            this.particleGroup.scale.set(e, e, e)
                        }!this.exiting && this.loader.elapsedMilliseconds > this.duration && (this.exiting = !0), this.exiting && (this.exitProgress += this.exitRate * this.loader.deltaTimeNormal, this.exitProgress >= 1 && !this.loader.completed && (this.exitProgress = 1, this.loader.complete()))
                    }
                }, {
                    key: "replay",
                    value: function() {
                        this.particleGroup.scale.set(1e-4, 1e-4, 1e-4);
                        for (var t = this.particles.length; t--;) this.particles[t].reset();
                        this.entering = !0, this.enterProgress = 0, this.exiting = !1, this.exitProgress = 0
                    }
                }]), t
            }();
        e.exports = s
    }, {}],
    5: [function(t, e, i) {
        "use strict";
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            s = function() {
                function t(e, i) {
                    return function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this.object3d = new THREE.Object3D, this.axisLength = e, this.opacity = i, this.createAxis(new THREE.Vector3(-this.axisLength, 0, 0), new THREE.Vector3(this.axisLength, 0, 0), new THREE.Color("hsl(0, 100%, 100%)")), this.createAxis(new THREE.Vector3(0, -this.axisLength, 0), new THREE.Vector3(0, this.axisLength, 0), new THREE.Color("hsl(120, 100%, 100%)")), this.createAxis(new THREE.Vector3(0, 0, -this.axisLength), new THREE.Vector3(0, 0, this.axisLength), new THREE.Color("hsl(240, 100%, 100%)")), this.object3d
                }
                return n(t, [{
                    key: "createAxis",
                    value: function(t, e, i) {
                        var n = new THREE.Geometry,
                            s = new THREE.LineBasicMaterial({
                                color: i,
                                opacity: this.opacity,
                                transparent: !0
                            });
                        n.vertices.push(t, e);
                        var r = new THREE.Line(n, s);
                        this.object3d.add(r)
                    }
                }]), t
            }();
        e.exports = s
    }, {}],
    6: [function(t, e, i) {
        "use strict";
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            s = function() {
                function t() {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t)
                }
                return n(t, [{
                    key: "rand",
                    value: function(t, e, i) {
                        void 0 === e && (e = t, t = 0);
                        var n = Math.random();
                        return i && (n = i(Math.random(), 0, 1, 1)), n * (e - t) + t
                    }
                }, {
                    key: "randInt",
                    value: function(t, e, i) {
                        void 0 === e && (e = t, t = 0);
                        Math.random();
                        return i && i(Math.random(), 0, 1, 1), Math.floor(Math.random() * (e - t + 1)) + t
                    }
                }, {
                    key: "randArr",
                    value: function(t) {
                        return t[Math.floor(Math.random() * t.length)]
                    }
                }, {
                    key: "map",
                    value: function(t, e, i, n, s) {
                        return (t - e) / (i - e) * (s - n) + n
                    }
                }, {
                    key: "clamp",
                    value: function(t, e, i) {
                        return Math.max(Math.min(t, i), e)
                    }
                }, {
                    key: "lerp",
                    value: function(t, e, i) {
                        return t + (e - t) * i
                    }
                }, {
                    key: "roundToUpperInterval",
                    value: function(t, e) {
                        return t % e == 0 && (t += 1e-4), Math.ceil(t / e) * e
                    }
                }, {
                    key: "roundToLowerInterval",
                    value: function(t, e) {
                        return t % e == 0 && (t -= 1e-4), Math.floor(t / e) * e
                    }
                }, {
                    key: "roundToNearestInterval",
                    value: function(t, e) {
                        return Math.round(t / e) * e
                    }
                }, {
                    key: "intersectSphere",
                    value: function(t, e) {
                        return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y) + (t.z - e.z) * (t.z - e.z)) < t.radius + e.radius
                    }
                }, {
                    key: "getIndexFromCoords",
                    value: function(t, e, i) {
                        return t + e * i
                    }
                }, {
                    key: "getCoordsFromIndex",
                    value: function(t, e) {
                        return {
                            x: t % e,
                            y: Math.floor(t / e)
                        }
                    }
                }, {
                    key: "visibleHeightAtZDepth",
                    value: function(t, e) {
                        var i = e.position.z;
                        t < i ? t -= i : t += i;
                        var n = e.fov * Math.PI / 180;
                        return 2 * Math.tan(n / 2) * Math.abs(t)
                    }
                }, {
                    key: "visibleWidthAtZDepth",
                    value: function(t, e) {
                        return this.visibleHeightAtZDepth(t, e) * e.aspect
                    }
                }]), t
            }();
        e.exports = s
    }, {}],
    7: [function(t, e, i) {
        "use strict";
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            s = function() {
                function t() {
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t)
                }
                return n(t, [{
                    key: "inQuad",
                    value: function(t, e, i, n) {
                        return i * (t /= n) * t + e
                    }
                }, {
                    key: "outQuad",
                    value: function(t, e, i, n) {
                        return -i * (t /= n) * (t - 2) + e
                    }
                }, {
                    key: "inOutQuad",
                    value: function(t, e, i, n) {
                        return (t /= n / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
                    }
                }, {
                    key: "inCubic",
                    value: function(t, e, i, n) {
                        return i * (t /= n) * t * t + e
                    }
                }, {
                    key: "outCubic",
                    value: function(t, e, i, n) {
                        return i * ((t = t / n - 1) * t * t + 1) + e
                    }
                }, {
                    key: "inOutCubic",
                    value: function(t, e, i, n) {
                        return (t /= n / 2) < 1 ? i / 2 * t * t * t + e : i / 2 * ((t -= 2) * t * t + 2) + e
                    }
                }, {
                    key: "inQuart",
                    value: function(t, e, i, n) {
                        return i * (t /= n) * t * t * t + e
                    }
                }, {
                    key: "outQuart",
                    value: function(t, e, i, n) {
                        return -i * ((t = t / n - 1) * t * t * t - 1) + e
                    }
                }, {
                    key: "inOutQuart",
                    value: function(t, e, i, n) {
                        return (t /= n / 2) < 1 ? i / 2 * t * t * t * t + e : -i / 2 * ((t -= 2) * t * t * t - 2) + e
                    }
                }, {
                    key: "inQuint",
                    value: function(t, e, i, n) {
                        return i * (t /= n) * t * t * t * t + e
                    }
                }, {
                    key: "outQuint",
                    value: function(t, e, i, n) {
                        return i * ((t = t / n - 1) * t * t * t * t + 1) + e
                    }
                }, {
                    key: "inOutQuint",
                    value: function(t, e, i, n) {
                        return (t /= n / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
                    }
                }, {
                    key: "inSine",
                    value: function(t, e, i, n) {
                        return -i * Math.cos(t / n * (Math.PI / 2)) + i + e
                    }
                }, {
                    key: "outSine",
                    value: function(t, e, i, n) {
                        return i * Math.sin(t / n * (Math.PI / 2)) + e
                    }
                }, {
                    key: "inOutSine",
                    value: function(t, e, i, n) {
                        return -i / 2 * (Math.cos(Math.PI * t / n) - 1) + e
                    }
                }, {
                    key: "inExpo",
                    value: function(t, e, i, n) {
                        return 0 == t ? e : i * Math.pow(2, 10 * (t / n - 1)) + e
                    }
                }, {
                    key: "outExpo",
                    value: function(t, e, i, n) {
                        return t == n ? e + i : i * (1 - Math.pow(2, -10 * t / n)) + e
                    }
                }, {
                    key: "inOutExpo",
                    value: function(t, e, i, n) {
                        return 0 == t ? e : t == n ? e + i : (t /= n / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + e : i / 2 * (2 - Math.pow(2, -10 * --t)) + e
                    }
                }, {
                    key: "inCirc",
                    value: function(t, e, i, n) {
                        return -i * (Math.sqrt(1 - (t /= n) * t) - 1) + e
                    }
                }, {
                    key: "outCirc",
                    value: function(t, e, i, n) {
                        return i * Math.sqrt(1 - (t = t / n - 1) * t) + e
                    }
                }, {
                    key: "inOutCirc",
                    value: function(t, e, i, n) {
                        return (t /= n / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + e : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
                    }
                }, {
                    key: "inElastic",
                    value: function(t, e, i, n) {
                        var s = 1.70158,
                            r = 0,
                            a = i;
                        if (0 == t) return e;
                        if (1 == (t /= n)) return e + i;
                        if (r || (r = .3 * n), a < Math.abs(i)) {
                            a = i
                        } else s = r / (2 * Math.PI) * Math.asin(i / a);
                        return -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - s) * (2 * Math.PI) / r) + e
                    }
                }, {
                    key: "outElastic",
                    value: function(t, e, i, n) {
                        var s = 1.70158,
                            r = 0,
                            a = i;
                        if (0 == t) return e;
                        if (1 == (t /= n)) return e + i;
                        if (r || (r = .3 * n), a < Math.abs(i)) {
                            a = i
                        } else s = r / (2 * Math.PI) * Math.asin(i / a);
                        return a * Math.pow(2, -10 * t) * Math.sin((t * n - s) * (2 * Math.PI) / r) + i + e
                    }
                }, {
                    key: "inOutElastic",
                    value: function(t, e, i, n) {
                        var s = 1.70158,
                            r = 0,
                            a = i;
                        if (0 == t) return e;
                        if (2 == (t /= n / 2)) return e + i;
                        if (r || (r = n * (.3 * 1.5)), a < Math.abs(i)) {
                            a = i
                        } else s = r / (2 * Math.PI) * Math.asin(i / a);
                        return t < 1 ? a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - s) * (2 * Math.PI) / r) * -.5 + e : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * n - s) * (2 * Math.PI) / r) * .5 + i + e
                    }
                }, {
                    key: "inBack",
                    value: function(t, e, i, n, s) {
                        return void 0 == s && (s = 1.70158), i * (t /= n) * t * ((s + 1) * t - s) + e
                    }
                }, {
                    key: "outBack",
                    value: function(t, e, i, n, s) {
                        return void 0 == s && (s = 1.70158), i * ((t = t / n - 1) * t * ((s + 1) * t + s) + 1) + e
                    }
                }, {
                    key: "inOutBack",
                    value: function(t, e, i, n, s) {
                        return void 0 == s && (s = 1.70158), (t /= n / 2) < 1 ? i / 2 * (t * t * ((1 + (s *= 1.525)) * t - s)) + e : i / 2 * ((t -= 2) * t * ((1 + (s *= 1.525)) * t + s) + 2) + e
                    }
                }]), t
            }();
        e.exports = s
    }, {}],
    8: [function(t, e, i) {
        "use strict";
        var n = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            s = function() {
                function t(e, i) {
                    var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                        s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), this._val = e, this._rate = i, this._dir = n, this._flip = s, this._valBase = e, this._rateBase = i, this._dirBase = n, this._flipBase = s, this.trigger = !1, this.triggerTop = !1, this.triggerBot = !1
                }
                return n(t, [{
                    key: "reset",
                    value: function() {
                        this._val = this._valBase, this._rate = this._rateBase, this._dir = this._dirBase, this._flip = this._flipBase, this.trigger = !1, this.triggerTop = !1, this.triggerBot = !1
                    }
                }, {
                    key: "update",
                    value: function(t) {
                        this.trigger = !1, this.triggerTop = !1, this.triggerBot = !1, this._dir ? this._val < 1 ? this._val += this._rate * t : (this.trigger = !0, this.triggerTop = !0, this._flip ? this._val = this._val - 1 : (this._val = 1 - (this._val - 1), this._dir = !this._dir)) : this._val > 0 ? this._val -= this._rate * t : (this.trigger = !0, this.triggerBot = !0, this._flip ? this._val = 1 + this._val : (this._val = -this._val, this._dir = !this._dir))
                    }
                }, {
                    key: "val",
                    value: function(t) {
                        return t ? t(this._val, 0, 1, 1) : this._val
                    }
                }]), t
            }();
        e.exports = s
    }, {}]
}, {}, [1]);