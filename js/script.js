// JavaScript Document

//兼容获取非行间样式
function getStyle(obj,attr){
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj,false)[attr];
    }
};

//用class选元素（第二个参数可选）

function getByClass(clsName, parent){
    //判断是否有父元素这个参数传进来
    var oParent=parent?document.getElementById(parent):document;
    //1.所有的选出来
    var aEle=oParent.getElementsByTagName('*');
    var arr=[];
    
    //2.筛选——选中塞进arr
    for(var i=0;i<aEle.length;i++)
    {
        if(aEle[i].className==clsName)
        {
            arr.push(aEle[i]);
        }
    }
    
    //3.把所有的返回出去
    return arr;
};

//
function getId(id){
    var $=document.getElementById(id);
    return $;
};

// StyleFix 1.0.2 & PrefixFree 1.0.4 / by Lea Verou / MIT license



(function() {
    function h(a, b) {
        return [].slice.call((b || document).querySelectorAll(a))
    }
    if (window.addEventListener) {
        var b = window.StyleFix = {
            link: function(a) {
                try {
                    if ("stylesheet" !== a.rel || a.hasAttribute("data-noprefix")) return
                } catch(c) {
                    return
                }
                var d = a.href || a.getAttribute("data-href"),
                f = d.replace(/[^\/]+$/, ""),
                g = a.parentNode,
                e = new XMLHttpRequest;
                e.open("GET", d);
                e.onreadystatechange = function() {
                    if (4 === e.readyState) {
                        var c = e.responseText;
                        if (c && a.parentNode) {
                            c = b.fix(c, !0, a);
                            f && (c = c.replace(/url\(((?:"|')?)(.+?)\1\)/gi,
                            function(a, c, b) {
                                return ! /^([a-z]{3,10}:|\/|#)/i.test(b) ? 'url("' + f + b + '")': a
                            }), c = c.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + f, "gi"), "$1"));
                            var d = document.createElement("style");
                            d.textContent = c;
                            d.media = a.media;
                            d.disabled = a.disabled;
                            d.setAttribute("data-href", a.getAttribute("href"));
                            g.insertBefore(d, a);
                            g.removeChild(a)
                        }
                    }
                };
                e.send(null);
                a.setAttribute("data-inprogress", "")
            },
            styleElement: function(a) {
                var c = a.disabled;
                a.textContent = b.fix(a.textContent, !0, a);
                a.disabled = c
            },
            styleAttribute: function(a) {
                var c = a.getAttribute("style"),
                c = b.fix(c, !1, a);
                a.setAttribute("style", c)
            },
            process: function() {
                h('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);
                h("style").forEach(StyleFix.styleElement);
                h("[style]").forEach(StyleFix.styleAttribute)
            },
            register: function(a, c) { (b.fixers = b.fixers || []).splice(void 0 === c ? b.fixers.length: c, 0, a)
            },
            fix: function(a, c) {
                for (var d = 0; d < b.fixers.length; d++) a = b.fixers[d](a, c) || a;
                return a
            },
            camelCase: function(a) {
                return a.replace(/-([a-z])/g,
                function(a, b) {
                    return b.toUpperCase()
                }).replace("-", "")
            },
            deCamelCase: function(a) {
                return a.replace(/[A-Z]/g,
                function(a) {
                    return "-" + a.toLowerCase()
                })
            }
        }; (function() {
            setTimeout(function() {
                h('link[rel="stylesheet"]').forEach(StyleFix.link)
            },
            10);
            document.addEventListener("DOMContentLoaded", StyleFix.process, !1)
        })()
    }
})(); 

(function(h) {
    if (window.StyleFix && window.getComputedStyle) {
        var b = window.PrefixFree = {
            prefixCSS: function(a, c) {
                function d(c, d, f, g) {
                    c = b[c];
                    c.length && (c = RegExp(d + "(" + c.join("|") + ")" + f, "gi"), a = a.replace(c, g))
                }
                var f = b.prefix;
                d("functions", "(\\s|:|,)", "\\s*\\(", "$1" + f + "$2(");
                d("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + f + "$2$3");
                d("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + f + "$2:");
                if (b.properties.length) {
                    var g = RegExp("\\b(" + b.properties.join("|") + ")(?!:)", "gi");
                    d("valueProperties", "\\b", ":(.+?);",
                    function(a) {
                        return a.replace(g, f + "$1")
                    })
                }
                c && (d("selectors", "", "\\b", b.prefixSelector), d("atrules", "@", "\\b", "@" + f + "$1"));
                return a = a.replace(RegExp("-" + f, "g"), "-")
            },
            prefixSelector: function(a) {
                return a.replace(/^:{1,2}/,
                function(a) {
                    return a + b.prefix
                })
            },
            prefixProperty: function(a, c) {
                var d = b.prefix + a;
                return c ? StyleFix.camelCase(d) : d
            }
        }; 

        (function() {
            var a = {},
            c = [],
            d = getComputedStyle(document.documentElement, null),
            f = document.createElement("div").style,
            g = function(b) {
                if ("-" === b.charAt(0)) {
                    c.push(b);
                    var b = b.split("-"),
                    d = b[1];
                    for (a[d] = ++a[d] || 1; 3 < b.length;) b.pop(),
                    d = b.join("-"),
                    StyleFix.camelCase(d) in f && -1 === c.indexOf(d) && c.push(d)
                }
            };
            if (0 < d.length) for (var e = 0; e < d.length; e++) g(d[e]);
            else for (var i in d) g(StyleFix.deCamelCase(i));
            var e = 0,
            j, h;
            for (h in a) d = a[h],
            e < d && (j = h, e = d);
            b.prefix = "-" + j + "-";
            b.Prefix = StyleFix.camelCase(b.prefix);
            b.properties = [];
            for (e = 0; e < c.length; e++) i = c[e],
            0 === i.indexOf(b.prefix) && (j = i.slice(b.prefix.length), StyleFix.camelCase(j) in f || b.properties.push(j));
            "Ms" == b.Prefix && !("transform" in f) && !("MsTransform" in f) && "msTransform" in f && b.properties.push("transform", "transform-origin");
            b.properties.sort()
        })(); 

        (function() {
            function a(a, b) {
                f[b] = "";
                f[b] = a;
                return !! f[b]
            }
            var c = {
                "linear-gradient": {
                    property: "backgroundImage",
                    params: "red, teal"
                },
                calc: {
                    property: "width",
                    params: "1px + 5%"
                },
                element: {
                    property: "backgroundImage",
                    params: "#foo"
                },
                "cross-fade": {
                    property: "backgroundImage",
                    params: "url(a.png), url(b.png), 50%"
                }
            };
            c["repeating-linear-gradient"] = c["repeating-radial-gradient"] = c["radial-gradient"] = c["linear-gradient"];
            var d = {
                initial: "color",
                "zoom-in": "cursor",
                "zoom-out": "cursor",
                box: "display",
                flexbox: "display",
                "inline-flexbox": "display"
            };
            b.functions = [];
            b.keywords = [];
            var f = document.createElement("div").style,
            g;
            for (g in c) {
                var e = c[g],
                i = e.property,
                e = g + "(" + e.params + ")"; ! a(e, i) && a(b.prefix + e, i) && b.functions.push(g)
            }
            for (var h in d) i = d[h],
            !a(h, i) && a(b.prefix + h, i) && b.keywords.push(h)
        })();

        (function() {
            function a(a) {
                f.textContent = a + "{}";
                return !! f.sheet.cssRules.length
            }
            var c = {
                ":read-only": null,
                ":read-write": null,
                ":any-link": null,
                "::selection": null
            },
            d = {
                keyframes: "name",
                viewport: null,
                document: 'regexp(".")'
            };
            b.selectors = [];
            b.atrules = [];
            var f = h.appendChild(document.createElement("style")),
            g;
            for (g in c) {
                var e = g + (c[g] ? "(" + c[g] + ")": ""); ! a(e) && a(b.prefixSelector(e)) && b.selectors.push(g)
            }
            for (var i in d) e = i + " " + (d[i] || ""),
            !a("@" + e) && a("@" + b.prefix + e) && b.atrules.push(i);
            h.removeChild(f)
        })();
        b.valueProperties = ["transition", "transition-property"];
        h.className += " " + b.prefix;
        StyleFix.register(b.prefixCSS)
    }
})(document.documentElement);

$(document).ready(function() {
    

});

/*星级评分*/
function pingfen(id)
{
    var oPingfen=getId(id);
    var aLi=oPingfen.getElementsByTagName('li');
    
    for(var i=0;i<aLi.length;i++)
    {
        aLi[i].index=i;
        aLi[i].onmouseover=function ()
        {
            for(var i=0;i<=this.index;i++)
            {
                aLi[i].className=i%2?'r_active':'l_active';
            }
        };
        aLi[i].onmouseout=function ()
        {
            for(var i=0;i<aLi.length;i++)
            {
                aLi[i].className=i%2?'r':'l';
            }
        };
        aLi[i].onclick=function ()
        {
            for(var i=0;i<aLi.length;i++)
            {
                aLi[i].onmouseover=null;
                aLi[i].onmouseout=null;
                aLi[i].onclick=null;
            }
            
            alert('当前是：'+(this.index+1)/2+'分');
        };
    }
};

//搜索分类切换
function oSel(id)
{
    var selBox=document.getElementById(id);
    var oSelect=selBox.getElementsByTagName('select')[0];
    var oDivParent=document.createElement('div');
    var selBtn=document.createElement('div');
    var oUl=document.createElement('ul');
    var aLi=null;
    selBtn.innerHTML=oSelect.options[0].text;
    selBtn.onclick=function(ev)
    {
        var oEvent=ev||event;
        oUl.style.display="block";
        oEvent.cancelBubble=true;
    };
    document.onclick=function()
    {
        oUl.style.display="none"; 
    };
    for(i=0;i<oSelect.options.length;i++)
    {
        aLi=document.createElement('li');
        oUl.appendChild(aLi);
        aLi.innerHTML=oSelect.options[i].text;
        aLi.myValue=oSelect.options[i].value;
        aLi.onmouseover=function()
        {
            this.style.background="#333333";    
        };
        aLi.onmouseout=function()
        {
            this.style.background="";   
        };
        aLi.onclick=function()
        {
            selBtn.innerHTML=this.innerHTML;
            oSelect.value=this.myValue;
            oUl.style.display="none"; 
        }
    };
    oDivParent.className='my_sel';
    oDivParent.appendChild(selBtn);
    oDivParent.appendChild(oUl);
    selBox.appendChild(oDivParent);
    oSelect.style.display="none";
};