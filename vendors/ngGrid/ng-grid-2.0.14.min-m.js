(function(e, n) {
    "use strict";
    var t = 6,
        o = 4,
        i = "asc",
        r = "desc",
        l = "_ng_field_",
        a = "_ng_depth_",
        s = "_ng_hidden_",
        c = "_ng_column_",
        g = /CUSTOM_FILTERS/g,
        d = /COL_FIELD/g,
        u = /DISPLAY_CELL_TEMPLATE/g,
        f = /EDITABLE_CELL_TEMPLATE/g,
        h = /CELL_EDITABLE_CONDITION/g,
        p = /<.+>/,
        m = /(\([^)]*\))?$/,
        v = /\./g,
        w = /'/g,
        C = /^(.*)((?:\s*\[\s*\d+\s*\]\s*)|(?:\s*\[\s*"(?:[^"\\]|\\.)*"\s*\]\s*)|(?:\s*\[\s*'(?:[^'\\]|\\.)*'\s*\]\s*))(.*)$/;
    e.ngGrid = {}, e.ngGrid.i18n = {}, angular.module("ngGrid.services", []);
    var b = angular.module("ngGrid.directives", []),
        y = angular.module("ngGrid.filters", []);
    angular.module("ngGrid", ["ngGrid.services", "ngGrid.directives", "ngGrid.filters"]);
    var S = function(e, n, o, i) {
        if (void 0 === e.selectionProvider.selectedItems || i.config.noKeyboardNavigation) return !0;
        if ("INPUT" === document.activeElement.tagName) return !0;
        var r, l = o.which || o.keyCode,
            a = !1,
            s = !1,
            c = void 0 === e.selectionProvider.lastClickedRow ? 1 : e.selectionProvider.lastClickedRow.rowIndex,
            g = e.columns.filter(function(e) {
                return e.visible && e.width > 0
            }),
            d = e.columns.filter(function(e) {
                return e.pinned
            });
        if (e.col && (r = g.indexOf(e.col)), 37 !== l && 38 !== l && 39 !== l && 40 !== l && (i.config.noTabInterference || 9 !== l) && 13 !== l) return !0;
        if (e.enableCellSelection) {
            9 === l && o.preventDefault();
            var u = e.showSelectionCheckbox ? 1 === r : 0 === r,
                f = 1 === r || 0 === r,
                h = r === g.length - 1 || r === g.length - 2,
                p = g.indexOf(e.col) === g.length - 1,
                m = d.indexOf(e.col) === d.length - 1;
            if (37 === l || 9 === l && o.shiftKey) {
                var v = 0;
                u || (r -= 1), f ? u && 9 === l && o.shiftKey ? (v = i.$canvas.width(), r = g.length - 1, s = !0) : v = i.$viewport.scrollLeft() - e.col.width : d.length > 0 && (v = i.$viewport.scrollLeft() - g[r].width), i.$viewport.scrollLeft(v)
            } else (39 === l || 9 === l && !o.shiftKey) && (h ? p && 9 === l && !o.shiftKey ? (i.$viewport.scrollLeft(0), r = e.showSelectionCheckbox ? 1 : 0, a = !0) : i.$viewport.scrollLeft(i.$viewport.scrollLeft() + e.col.width) : m && i.$viewport.scrollLeft(0), p || (r += 1))
        }
        var w;
        w = e.configGroups.length > 0 ? i.rowFactory.parsedData.filter(function(e) {
            return !e.isAggRow
        }) : i.filteredRows;
        var C = 0;
        if (0 !== c && (38 === l || 13 === l && o.shiftKey || 9 === l && o.shiftKey && s) ? C = -1 : c !== w.length - 1 && (40 === l || 13 === l && !o.shiftKey || 9 === l && a) && (C = 1), C) {
            var b = w[c + C];
            b.beforeSelectionChange(b, o) && (b.continueSelection(o), e.$emit("ngGridEventDigestGridParent"), e.selectionProvider.lastClickedRow.renderedRowIndex >= e.renderedRows.length - t - 2 ? i.$viewport.scrollTop(i.$viewport.scrollTop() + e.rowHeight) : t + 2 >= e.selectionProvider.lastClickedRow.renderedRowIndex && i.$viewport.scrollTop(i.$viewport.scrollTop() - e.rowHeight))
        }
        return e.enableCellSelection && setTimeout(function() {
            e.domAccessProvider.focusCellElement(e, e.renderedColumns.indexOf(g[r]))
        }, 3), !1
    };
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        var n = this.length >>> 0,
            t = Number(arguments[1]) || 0;
        for (t = 0 > t ? Math.ceil(t) : Math.floor(t), 0 > t && (t += n); n > t; t++)
            if (t in this && this[t] === e) return t;
        return -1
    }), Array.prototype.filter || (Array.prototype.filter = function(e) {
        var n = Object(this),
            t = n.length >>> 0;
        if ("function" != typeof e) throw new TypeError;
        for (var o = [], i = arguments[1], r = 0; t > r; r++)
            if (r in n) {
            var l = n[r];
            e.call(i, l, r, n) && o.push(l)
        }
        return o
    }), y.filter("checkmark", function() {
        return function(e) {
            return e ? "✔" : "✘"
        }
    }), y.filter("ngColumns", function() {
        return function(e) {
            return e.filter(function(e) {
                return !e.isAggCol
            })
        }
    }), angular.module("ngGrid.services").factory("$domUtilityService", ["$utilityService", "$window", function(e, t) {
        var o = {},
            i = {},
            r = function() {
                var e = n("<div></div>");
                e.appendTo("body"), e.height(100).width(100).css("position", "absolute").css("overflow", "scroll"), e.append('<div style="height: 400px; width: 400px;"></div>'), o.ScrollH = e.height() - e[0].clientHeight, o.ScrollW = e.width() - e[0].clientWidth, e.empty(), e.attr("style", ""), e.append('<span style="font-family: Verdana, Helvetica, Sans-Serif; font-size: 14px;"><strong>M</strong></span>'), o.LetterW = e.children().first().width(), e.remove()
            };
        return o.eventStorage = {}, o.AssignGridContainers = function(e, t, i) {
            i.$root = n(t), i.$topPanel = i.$root.find(".ngTopPanel"), i.$groupPanel = i.$root.find(".ngGroupPanel"), i.$headerContainer = i.$topPanel.find(".ngHeaderContainer"), e.$headerContainer = i.$headerContainer, i.$headerScroller = i.$topPanel.find(".ngHeaderScroller"), i.$headers = i.$headerScroller.children(), i.$viewport = i.$root.find(".ngViewport"), i.$canvas = i.$viewport.find(".ngCanvas"), i.$footerPanel = i.$root.find(".ngFooterPanel");
            var r = e.$watch(function() {
                return i.$viewport.scrollLeft()
            }, function(e) {
                return i.$headerContainer.scrollLeft(e)
            });
            e.$on("$destroy", function() {
                i.$root && (n(i.$root.parent()).off("resize.nggrid"), i.$root = null, i.$topPanel = null, i.$headerContainer = null, i.$headers = null, i.$canvas = null, i.$footerPanel = null), r()
            }), o.UpdateGridLayout(e, i)
        }, o.getRealWidth = function(e) {
            var t = 0,
                o = {
                    visibility: "hidden",
                    display: "block"
                },
                i = e.parents().andSelf().not(":visible");
            return n.swap(i[0], o, function() {
                t = e.outerWidth()
            }), t
        }, o.UpdateGridLayout = function(e, n) {
            if (n.$root) {
                var t = n.$viewport.scrollTop();
                n.elementDims.rootMaxW = n.$root.width(), n.$root.is(":hidden") && (n.elementDims.rootMaxW = o.getRealWidth(n.$root)), n.elementDims.rootMaxH = n.$root.height(), n.refreshDomSizes(), e.adjustScrollTop(t, !0)
            }
        }, o.numberOfGrids = 0, o.setStyleText = function(e, n) {
            var o = e.styleSheet,
                i = e.gridId,
                r = t.document;
            o || (o = r.getElementById(i)), o || (o = r.createElement("style"), o.type = "text/css", o.id = i, (r.head || r.getElementsByTagName("head")[0]).appendChild(o)), o.styleSheet && !o.sheet ? o.styleSheet.cssText = n : o.innerHTML = n, e.styleSheet = o, e.styleText = n
        }, o.BuildStyles = function(e, n, t) {
            var i, r = n.config.rowHeight,
                l = n.gridId,
                a = e.columns,
                s = 0,
                c = e.totalRowWidth();
            i = "." + l + " .ngCanvas { width: " + c + "px; }" + "." + l + " .ngRow { width: " + c + "px; }" + "." + l + " .ngCanvas { width: " + c + "px; }" + "." + l + " .ngHeaderScroller { width: " + (c + o.ScrollH) + "px}";
            for (var g = 0; a.length > g; g++) {
                var d = a[g];
                if (d.visible !== !1) {
                    var u = 0;
                    g === a.length - 1 && s + d.width < n.elementDims.rootMaxW && (u = n.elementDims.rootMaxW - s - d.width), i += "." + l + " .col" + g + " { width: " + (d.width + u) + "px; left: " + s + "px; height: " + r + "px }" + "." + l + " .colt" + g + " { width: " + (d.width + u) + "px; }", s += d.width
                }
            }
            o.setStyleText(n, i), e.adjustScrollLeft(n.$viewport.scrollLeft()), t && o.digest(e)
        }, o.setColLeft = function(e, n, t) {
            if (t.styleText) {
                var r = i[e.index];
                r || (r = i[e.index] = RegExp(".col" + e.index + " { width: [0-9]+px; left: [0-9]+px"));
                var l = t.styleText.replace(r, ".col" + e.index + " { width: " + e.width + "px; left: " + n + "px");
                o.setStyleText(t, l)
            }
        }, o.setColLeft.immediate = 1, o.RebuildGrid = function(e, n) {
            o.UpdateGridLayout(e, n), (null == n.config.maintainColumnRatios || n.config.maintainColumnRatios) && n.configureColumnWidths(), e.adjustScrollLeft(n.$viewport.scrollLeft()), o.BuildStyles(e, n, !0)
        }, o.digest = function(e) {
            e.$root.$$phase || e.$digest()
        }, o.ScrollH = 17, o.ScrollW = 17, o.LetterW = 10, r(), o
    } ]), angular.module("ngGrid.services").factory("$sortService", ["$parse", "$utilityService", function(e, n) {
        var t = {};
        return t.colSortFnCache = {}, t.isCustomSort = !1, t.guessSortFn = function(e) {
            var n = typeof e;
            switch (n) {
                case "number":
                    return t.sortNumber;
                case "boolean":
                    return t.sortBool;
                case "string":
                    return e.match(/^[-+]?[£$¤]?[\d,.]+%?$/) ? t.sortNumberStr : t.sortAlpha;
                default:
                    return "[object Date]" === Object.prototype.toString.call(e) ? t.sortDate : t.basicSort
            }
        }, t.basicSort = function(e, n) {
            return e === n ? 0 : n > e ? -1 : 1
        }, t.sortNumber = function(e, n) {
            return e - n
        }, t.sortNumberStr = function(e, n) {
            var t, o, i = !1,
                r = !1;
            return t = parseFloat(e.replace(/[^0-9.-]/g, "")), isNaN(t) && (i = !0), o = parseFloat(n.replace(/[^0-9.-]/g, "")), isNaN(o) && (r = !0), i && r ? 0 : i ? 1 : r ? -1 : t - o
        }, t.sortAlpha = function(e, n) {
            var t = e.toLowerCase(),
                o = n.toLowerCase();
            return t === o ? 0 : o > t ? -1 : 1
        }, t.sortDate = function(e, n) {
            var t = e.getTime(),
                o = n.getTime();
            return t === o ? 0 : o > t ? -1 : 1
        }, t.sortBool = function(e, n) {
            return e && n ? 0 : e || n ? e ? 1 : -1 : 0
        }, t.sortData = function(e, o) {
            if (o && e) {
                var r, l, a = e.fields.length,
                    s = e.fields,
                    c = o.slice(0);
                o.sort(function(o, g) {
                    for (var d, u, f = 0, h = 0; 0 === f && a > h; ) {
                        r = e.columns[h], l = e.directions[h], u = t.getSortFn(r, c);
                        var p = n.evalProperty(o, s[h]),
                            m = n.evalProperty(g, s[h]);
                        t.isCustomSort ? (d = u(p, m), f = l === i ? d : 0 - d) : null == p || null == m ? null == m && null == p ? f = 0 : null == p ? f = 1 : null == m && (f = -1) : (d = u(p, m), f = l === i ? d : 0 - d), h++
                    }
                    return f
                })
            }
        }, t.Sort = function(e, n) {
            t.isSorting || (t.isSorting = !0, t.sortData(e, n), t.isSorting = !1)
        }, t.getSortFn = function(n, o) {
            var i, r;
            if (t.colSortFnCache[n.field]) i = t.colSortFnCache[n.field];
            else if (void 0 !== n.sortingAlgorithm) i = n.sortingAlgorithm, t.colSortFnCache[n.field] = n.sortingAlgorithm, t.isCustomSort = !0;
            else {
                if (r = o[0], !r) return i;
                i = t.guessSortFn(e("entity['" + n.field.replace(v, "']['") + "']")({
                    entity: r
                })), i ? t.colSortFnCache[n.field] = i : i = t.sortAlpha
            }
            return i
        }, t
    } ]), angular.module("ngGrid.services").factory("$utilityService", ["$parse", function(t) {
        var o = /function (.{1,})\(/,
            i = {
                visualLength: function(e) {
                    var t = document.getElementById("testDataLength");
                    t || (t = document.createElement("SPAN"), t.id = "testDataLength", t.style.visibility = "hidden", document.body.appendChild(t));
                    var o = n(e);
                    n(t).css({
                        font: o.css("font"),
                        "font-size": o.css("font-size"),
                        "font-family": o.css("font-family")
                    }), t.innerHTML = o.text();
                    var i = t.offsetWidth;
                    return document.body.removeChild(t), i
                },
                forIn: function(e, n) {
                    for (var t in e) e.hasOwnProperty(t) && n(e[t], t)
                },
                endsWith: function(e, n) {
                    return e && n && "string" == typeof e ? -1 !== e.indexOf(n, e.length - n.length) : !1
                },
                isNullOrUndefined: function(e) {
                    return void 0 === e || null === e ? !0 : !1
                },
                getElementsByClassName: function(e) {
                    if (document.getElementsByClassName) return document.getElementsByClassName(e);
                    for (var n = [], t = RegExp("\\b" + e + "\\b"), o = document.getElementsByTagName("*"), i = 0; o.length > i; i++) {
                        var r = o[i].className;
                        t.test(r) && n.push(o[i])
                    }
                    return n
                },
                newId: function() {
                    var e = (new Date).getTime();
                    return function() {
                        return e += 1
                    }
                } (),
                seti18n: function(n, t) {
                    var o = e.ngGrid.i18n[t];
                    for (var i in o) n.i18n[i] = o[i]
                },
                getInstanceType: function(e) {
                    var n = o.exec("" + e.constructor);
                    if (n && n.length > 1) {
                        var t = n[1].replace(/^\s+|\s+$/g, "");
                        return t
                    }
                    return ""
                },
                init: function() {
                    function e(n) {
                        var t = C.exec(n);
                        if (t) return (t[1] ? e(t[1]) : t[1]) + t[2] + (t[3] ? e(t[3]) : t[3]);
                        n = n.replace(w, "\\'");
                        var o = n.split(v),
                            i = [o.shift()];
                        return angular.forEach(o, function(e) {
                            i.push(e.replace(m, "']$1"))
                        }), i.join("['")
                    }
                    return this.preEval = e, this.evalProperty = function(n, o) {
                        return t(e("entity." + o))({
                            entity: n
                        })
                    }, delete this.init, this
                }
}.init();
        return i
    } ]);
    var x = function(e, n, t, o) {
        this.rowIndex = 0, this.offsetTop = this.rowIndex * t, this.entity = e, this.label = e.gLabel, this.field = e.gField, this.depth = e.gDepth, this.parent = e.parent, this.children = e.children, this.aggChildren = e.aggChildren, this.aggIndex = e.aggIndex, this.collapsed = o, this.groupInitState = o, this.rowFactory = n, this.rowHeight = t, this.isAggRow = !0, this.offsetLeft = 25 * e.gDepth, this.aggLabelFilter = e.aggLabelFilter
    };
    x.prototype.toggleExpand = function() {
        this.collapsed = this.collapsed ? !1 : !0, this.orig && (this.orig.collapsed = this.collapsed), this.notifyChildren()
    }, x.prototype.setExpand = function(e) {
        this.collapsed = e, this.orig && (this.orig.collapsed = e), this.notifyChildren()
    }, x.prototype.notifyChildren = function() {
        for (var e = Math.max(this.rowFactory.aggCache.length, this.children.length), n = 0; e > n; n++)
            if (this.aggChildren[n] && (this.aggChildren[n].entity[s] = this.collapsed, this.collapsed && this.aggChildren[n].setExpand(this.collapsed)), this.children[n] && (this.children[n][s] = this.collapsed), n > this.aggIndex && this.rowFactory.aggCache[n]) {
            var t = this.rowFactory.aggCache[n],
                    o = 30 * this.children.length;
            t.offsetTop = this.collapsed ? t.offsetTop - o : t.offsetTop + o
        }
        this.rowFactory.renderedChange()
    }, x.prototype.aggClass = function() {
        return this.collapsed ? "ngAggArrowCollapsed" : "ngAggArrowExpanded"
    }, x.prototype.totalChildren = function() {
        if (this.aggChildren.length > 0) {
            var e = 0,
                n = function(t) {
                    t.aggChildren.length > 0 ? angular.forEach(t.aggChildren, function(e) {
                        n(e)
                    }) : e += t.children.length
                };
            return n(this), e
        }
        return this.children.length
    }, x.prototype.copy = function() {
        var e = new x(this.entity, this.rowFactory, this.rowHeight, this.groupInitState);
        return e.orig = this, e
    };
    var T = function(e, t, o, l, a, s) {
        var c = this,
                d = e.colDef,
                u = 500,
                f = 0,
                h = null;
        c.colDef = e.colDef, c.width = d.width, c.groupIndex = 0, c.isGroupedBy = !1, c.minWidth = d.minWidth ? d.minWidth : 50, c.maxWidth = d.maxWidth ? d.maxWidth : 9e3, c.enableCellEdit = void 0 !== d.enableCellEdit ? d.enableCellEdit : e.enableCellEdit || e.enableCellEditOnFocus, c.cellEditableCondition = d.cellEditableCondition || e.cellEditableCondition || "true", c.headerRowHeight = e.headerRowHeight, c.displayName = void 0 === d.displayName ? d.field : d.displayName, c.index = e.index, c.isAggCol = e.isAggCol, c.cellClass = d.cellClass, c.sortPriority = void 0, c.cellFilter = d.cellFilter ? d.cellFilter : "", c.field = d.field, c.aggLabelFilter = d.aggLabelFilter || d.cellFilter, c.visible = s.isNullOrUndefined(d.visible) || d.visible, c.sortable = !1, c.resizable = !1, c.pinnable = !1, c.pinned = e.enablePinning && d.pinned, c.originalIndex = null == e.originalIndex ? c.index : e.originalIndex, c.groupable = s.isNullOrUndefined(d.groupable) || d.groupable, e.enableSort && (c.sortable = s.isNullOrUndefined(d.sortable) || d.sortable), e.enableResize && (c.resizable = s.isNullOrUndefined(d.resizable) || d.resizable), e.enablePinning && (c.pinnable = s.isNullOrUndefined(d.pinnable) || d.pinnable), c.sortDirection = void 0, c.sortingAlgorithm = d.sortFn, c.headerClass = d.headerClass, c.cursor = c.sortable ? "pointer" : "default", c.headerCellTemplate = d.headerCellTemplate || a.get("headerCellTemplate.html"), c.cellTemplate = d.cellTemplate || a.get("cellTemplate.html").replace(g, c.cellFilter ? "|" + c.cellFilter : ""), c.enableCellEdit && (c.cellEditTemplate = d.cellEditTemplate || a.get("cellEditTemplate.html"), c.editableCellTemplate = d.editableCellTemplate || a.get("editableCellTemplate.html")), d.cellTemplate && !p.test(d.cellTemplate) && (c.cellTemplate = a.get(d.cellTemplate) || n.ajax({
            type: "GET",
            url: d.cellTemplate,
            async: !1
        }).responseText), c.enableCellEdit && d.editableCellTemplate && !p.test(d.editableCellTemplate) && (c.editableCellTemplate = a.get(d.editableCellTemplate) || n.ajax({
            type: "GET",
            url: d.editableCellTemplate,
            async: !1
        }).responseText), d.headerCellTemplate && !p.test(d.headerCellTemplate) && (c.headerCellTemplate = a.get(d.headerCellTemplate) || n.ajax({
            type: "GET",
            url: d.headerCellTemplate,
            async: !1
        }).responseText), c.colIndex = function() {
            var e = c.pinned ? "pinned " : "";
            return e += "col" + c.index + " colt" + c.index, c.cellClass && (e += " " + c.cellClass), e
        }, c.groupedByClass = function() {
            return c.isGroupedBy ? "ngGroupedByIcon" : "ngGroupIcon"
        }, c.toggleVisible = function() {
            c.visible = !c.visible
        }, c.showSortButtonUp = function() {
            return c.sortable ? c.sortDirection === r : c.sortable
        }, c.showSortButtonDown = function() {
            return c.sortable ? c.sortDirection === i : c.sortable
        }, c.noSortVisible = function() {
            return !c.sortDirection
        }, c.sort = function(n) {
            if (!c.sortable) return !0;
            var t = c.sortDirection === i ? r : i;
            return c.sortDirection = t, e.sortCallback(c, n), !1
        }, c.gripClick = function() {
            f++, 1 === f ? h = setTimeout(function() {
                f = 0
            }, u) : (clearTimeout(h), e.resizeOnDataCallback(c), f = 0)
        }, c.gripOnMouseDown = function(e) {
            return t.isColumnResizing = !0, e.ctrlKey && !c.pinned ? (c.toggleVisible(), l.BuildStyles(t, o), !0) : (e.target.parentElement.style.cursor = "col-resize", c.startMousePosition = e.clientX, c.origWidth = c.width, n(document).mousemove(c.onMouseMove), n(document).mouseup(c.gripOnMouseUp), !1)
        }, c.onMouseMove = function(e) {
            var n = e.clientX - c.startMousePosition,
                    i = n + c.origWidth;
            return c.width = c.minWidth > i ? c.minWidth : i > c.maxWidth ? c.maxWidth : i, t.hasUserChangedGridColumnWidths = !0, l.BuildStyles(t, o), !1
        }, c.gripOnMouseUp = function(e) {
            return n(document).off("mousemove", c.onMouseMove), n(document).off("mouseup", c.gripOnMouseUp), e.target.parentElement.style.cursor = "default", l.digest(t), t.isColumnResizing = !1, !1
        }, c.copy = function() {
            var n = new T(e, t, o, l, a, s);
            return n.isClone = !0, n.orig = c, n
        }, c.setVars = function(e) {
            c.orig = e, c.width = e.width, c.groupIndex = e.groupIndex, c.isGroupedBy = e.isGroupedBy, c.displayName = e.displayName, c.index = e.index, c.isAggCol = e.isAggCol, c.cellClass = e.cellClass, c.cellFilter = e.cellFilter, c.field = e.field, c.aggLabelFilter = e.aggLabelFilter, c.visible = e.visible, c.sortable = e.sortable, c.resizable = e.resizable, c.pinnable = e.pinnable, c.pinned = e.pinned, c.originalIndex = e.originalIndex, c.sortDirection = e.sortDirection, c.sortingAlgorithm = e.sortingAlgorithm, c.headerClass = e.headerClass, c.headerCellTemplate = e.headerCellTemplate, c.cellTemplate = e.cellTemplate, c.cellEditTemplate = e.cellEditTemplate
        }
    },
        P = function(e) {
            this.outerHeight = null, this.outerWidth = null, n.extend(this, e)
        },
        I = function(e) {
            this.previousColumn = null, this.grid = e
        };
    I.prototype.changeUserSelect = function(e, n) {
        e.css({
            "-webkit-touch-callout": n,
            "-webkit-user-select": n,
            "-khtml-user-select": n,
            "-moz-user-select": "none" === n ? "-moz-none" : n,
            "-ms-user-select": n,
            "user-select": n
        })
    }, I.prototype.focusCellElement = function(e, n) {
        if (e.selectionProvider.lastClickedRow) {
            var t = void 0 !== n ? n : this.previousColumn,
                o = e.selectionProvider.lastClickedRow.clone ? e.selectionProvider.lastClickedRow.clone.elm : e.selectionProvider.lastClickedRow.elm;
            if (void 0 !== t && o) {
                var i = angular.element(o[0].children).filter(function() {
                    return 8 !== this.nodeType
                }),
                    r = Math.max(Math.min(e.renderedColumns.length - 1, t), 0);
                this.grid.config.showSelectionCheckbox && angular.element(i[r]).scope() && 0 === angular.element(i[r]).scope().col.index && (r = 1), i[r] && i[r].children[1].children[0].focus(), this.previousColumn = t
            }
        }
    }, I.prototype.selectionHandlers = function(e, n) {
        function t(t) {
            if (16 === t.keyCode) return r.changeUserSelect(n, "none", t), !0;
            if (!i) {
                i = !0;
                var o = S(e, n, t, r.grid);
                return i = !1, o
            }
            return !0
        }

        function o(e) {
            return 16 === e.keyCode && r.changeUserSelect(n, "text", e), !0
        }
        var i = !1,
            r = this;
        n.bind("keydown", t), n.bind("keyup", o), n.on("$destroy", function() {
            n.off("keydown", t), n.off("keyup", o)
        })
    };
    var $ = function(t, o, i, r) {
        var l = this;
        l.colToMove = void 0, l.groupToMove = void 0, l.assignEvents = function() {
            t.config.jqueryUIDraggable && !t.config.enablePinning ? (t.$groupPanel.droppable({
                addClasses: !1,
                drop: function(e) {
                    l.onGroupDrop(e)
                }
            }), t.$groupPanel.on("$destroy", function() {
                t.$groupPanel = null
            })) : (t.$groupPanel.on("mousedown", l.onGroupMouseDown).on("dragover", l.dragOver).on("drop", l.onGroupDrop), t.$topPanel.on("mousedown", ".ngHeaderScroller", l.onHeaderMouseDown).on("dragover", ".ngHeaderScroller", l.dragOver), t.$groupPanel.on("$destroy", function() {
                t.$groupPanel && t.$groupPanel.off("mousedown"), t.$groupPanel = null
            }), t.config.enableColumnReordering && t.$topPanel.on("drop", ".ngHeaderScroller", l.onHeaderDrop), t.$topPanel.on("$destroy", function() {
                t.$topPanel && t.$topPanel.off("mousedown"), t.config.enableColumnReordering && t.$topPanel && t.$topPanel.off("drop"), t.$topPanel = null
            })), o.$on("$destroy", o.$watch("renderedColumns", function() {
                r(l.setDraggables)
            }))
        }, l.dragStart = function(e) {
            e.dataTransfer.setData("text", "")
        }, l.dragOver = function(e) {
            e.preventDefault()
        }, l.setDraggables = function() {
            if (t.config.jqueryUIDraggable) t.$root && t.$root.find(".ngHeaderSortColumn").draggable({
                helper: "clone",
                appendTo: "body",
                stack: "div",
                addClasses: !1,
                start: function(e) {
                    l.onHeaderMouseDown(e)
                }
            }).droppable({
                drop: function(e) {
                    l.onHeaderDrop(e)
                }
            });
            else if (t.$root) {
                var e = t.$root.find(".ngHeaderSortColumn");
                if (angular.forEach(e, function(e) {
                    e.className && -1 !== e.className.indexOf("ngHeaderSortColumn") && (e.setAttribute("draggable", "true"), e.addEventListener && (e.addEventListener("dragstart", l.dragStart), angular.element(e).on("$destroy", function() {
                        angular.element(e).off("dragstart", l.dragStart), e.removeEventListener("dragstart", l.dragStart)
                    })))
                }), -1 !== navigator.userAgent.indexOf("MSIE")) {
                    var n = t.$root.find(".ngHeaderSortColumn");
                    n.bind("selectstart", function() {
                        return this.dragDrop(), !1
                    }), angular.element(n).on("$destroy", function() {
                        n.off("selectstart")
                    })
                }
            }
        }, l.onGroupMouseDown = function(e) {
            var o = n(e.target);
            if ("ngRemoveGroup" !== o[0].className) {
                var i = angular.element(o).scope();
                i && (t.config.jqueryUIDraggable || (o.attr("draggable", "true"), this.addEventListener && (this.addEventListener("dragstart", l.dragStart), angular.element(this).on("$destroy", function() {
                    this.removeEventListener("dragstart", l.dragStart)
                })), -1 !== navigator.userAgent.indexOf("MSIE") && (o.bind("selectstart", function() {
                    return this.dragDrop(), !1
                }), o.on("$destroy", function() {
                    o.off("selectstart")
                }))), l.groupToMove = {
                    header: o,
                    groupName: i.group,
                    index: i.$index
                })
            } else l.groupToMove = void 0
        }, l.onGroupDrop = function(e) {
            e.stopPropagation();
            var i, r;
            l.groupToMove ? (i = n(e.target).closest(".ngGroupElement"), "ngGroupPanel" === i.context.className ? (o.configGroups.splice(l.groupToMove.index, 1), o.configGroups.push(l.groupToMove.groupName)) : (r = angular.element(i).scope(), r && l.groupToMove.index !== r.$index && (o.configGroups.splice(l.groupToMove.index, 1), o.configGroups.splice(r.$index, 0, l.groupToMove.groupName))), l.groupToMove = void 0, t.fixGroupIndexes()) : l.colToMove && (-1 === o.configGroups.indexOf(l.colToMove.col) && (i = n(e.target).closest(".ngGroupElement"), "ngGroupPanel" === i.context.className || "ngGroupPanelDescription ng-binding" === i.context.className ? o.groupBy(l.colToMove.col) : (r = angular.element(i).scope(), r && o.removeGroup(r.$index))), l.colToMove = void 0), o.$$phase || o.$apply()
        }, l.onHeaderMouseDown = function(e) {
            var t = n(e.target).closest(".ngHeaderSortColumn"),
                    o = angular.element(t).scope();
            o && (l.colToMove = {
                header: t,
                col: o.col
            })
        }, l.onHeaderDrop = function(e) {
            if (l.colToMove && !l.colToMove.col.pinned) {
                var r = n(e.target).closest(".ngHeaderSortColumn"),
                        a = angular.element(r).scope();
                if (a) {
                    if (l.colToMove.col === a.col || a.col.pinned) return;
                    o.columns.splice(l.colToMove.col.index, 1), o.columns.splice(a.col.index, 0, l.colToMove.col), t.fixColumnIndexes(), l.colToMove = void 0, i.digest(o)
                }
            }
        }, l.assignGridEventHandlers = function() {
-1 === t.config.tabIndex ? (t.$viewport.attr("tabIndex", i.numberOfGrids), i.numberOfGrids++) : t.$viewport.attr("tabIndex", t.config.tabIndex);
            var r, l = function() {
                clearTimeout(r), r = setTimeout(function() {
                    i.RebuildGrid(o, t)
                }, 100)
            };
            n(e).on("resize.nggrid", l);
            var a, s = function() {
                clearTimeout(a), a = setTimeout(function() {
                    i.RebuildGrid(o, t)
                }, 100)
            };
            n(t.$root.parent()).on("resize.nggrid", s), o.$on("$destroy", function() {
                n(e).off("resize.nggrid", l)
            })
        }, l.assignGridEventHandlers(), l.assignEvents()
    },
        D = function(e, n) {
            e.maxRows = function() {
                var t = Math.max(e.totalServerItems, n.data.length);
                return t
            }, e.$on("$destroy", e.$watch("totalServerItems", function() {
                e.currentMaxPages = e.maxPages()
            })), e.multiSelect = n.config.enableRowSelection && n.config.multiSelect, e.selectedItemCount = n.selectedItemCount, e.maxPages = function() {
                return 0 === e.maxRows() ? 1 : Math.ceil(e.maxRows() / e.pagingOptions.pageSize)
            }, e.pageForward = function() {
                var n = e.pagingOptions.currentPage;
                e.totalServerItems > 0 ? e.pagingOptions.currentPage = Math.min(n + 1, e.maxPages()) : e.pagingOptions.currentPage++
            }, e.pageBackward = function() {
                var n = e.pagingOptions.currentPage;
                e.pagingOptions.currentPage = Math.max(n - 1, 1)
            }, e.pageToFirst = function() {
                e.pagingOptions.currentPage = 1
            }, e.pageToLast = function() {
                var n = e.maxPages();
                e.pagingOptions.currentPage = n
            }, e.cantPageForward = function() {
                var t = e.pagingOptions.currentPage,
                    o = e.maxPages();
                return e.totalServerItems > 0 ? t >= o : 1 > n.data.length
            }, e.cantPageToLast = function() {
                return e.totalServerItems > 0 ? e.cantPageForward() : !0
            }, e.cantPageBackward = function() {
                var n = e.pagingOptions.currentPage;
                return 1 >= n
            }
        },
        L = function(i, r, l, a, c, g, d, u, f, h, m) {
            var v = {
                aggregateTemplate: void 0,
                afterSelectionChange: function() { },
                beforeSelectionChange: function() {
                    return !0
                },
                checkboxCellTemplate: void 0,
                checkboxHeaderTemplate: void 0,
                columnDefs: void 0,
                data: [],
                dataUpdated: function() { },
                enableCellEdit: !1,
                enableCellEditOnFocus: !1,
                enableCellSelection: !1,
                enableColumnResize: !1,
                enableColumnReordering: !1,
                enableColumnHeavyVirt: !1,
                enablePaging: !1,
                enablePinning: !1,
                enableRowSelection: !0,
                enableSorting: !0,
                enableHighlighting: !1,
                excludeProperties: [],
                filterOptions: {
                    filterText: "",
                    useExternalFilter: !1
                },
                footerRowHeight: 55,
                footerTemplate: void 0,
                forceSyncScrolling: !0,
                groups: [],
                groupsCollapsedByDefault: !0,
                headerRowHeight: 30,
                headerRowTemplate: void 0,
                jqueryUIDraggable: !1,
                jqueryUITheme: !1,
                keepLastSelected: !0,
                maintainColumnRatios: void 0,
                menuTemplate: void 0,
                multiSelect: !0,
                pagingOptions: {
                    pageSizes: [250, 500, 1e3],
                    pageSize: 250,
                    currentPage: 1
                },
                pinSelectionCheckbox: !1,
                plugins: [],
                primaryKey: void 0,
                rowHeight: 30,
                rowTemplate: void 0,
                selectedItems: [],
                selectionCheckboxColumnWidth: 25,
                selectWithCheckboxOnly: !1,
                showColumnMenu: !1,
                showFilter: !1,
                showFooter: !1,
                showGroupPanel: !1,
                showSelectionCheckbox: !1,
                sortInfo: {
                    fields: [],
                    columns: [],
                    directions: []
                },
                tabIndex: -1,
                totalServerItems: 0,
                useExternalSorting: !1,
                i18n: "en",
                virtualizationThreshold: 50,
                noTabInterference: !1
            },
                w = this;
            w.maxCanvasHt = 0, w.config = n.extend(v, e.ngGrid.config, r), w.config.showSelectionCheckbox = w.config.showSelectionCheckbox && w.config.enableColumnHeavyVirt === !1, w.config.enablePinning = w.config.enablePinning && w.config.enableColumnHeavyVirt === !1, w.config.selectWithCheckboxOnly = w.config.selectWithCheckboxOnly && w.config.showSelectionCheckbox !== !1, w.config.pinSelectionCheckbox = w.config.enablePinning, "string" == typeof r.columnDefs && (w.config.columnDefs = i.$eval(r.columnDefs)), w.rowCache = [], w.rowMap = [], w.gridId = "ng" + d.newId(), w.$root = null, w.$groupPanel = null, w.$topPanel = null, w.$headerContainer = null, w.$headerScroller = null, w.$headers = null, w.$viewport = null, w.$canvas = null, w.rootDim = w.config.gridDim, w.data = [], w.lateBindColumns = !1, w.filteredRows = [], w.initTemplates = function() {
                var e = ["rowTemplate", "aggregateTemplate", "headerRowTemplate", "checkboxCellTemplate", "checkboxHeaderTemplate", "menuTemplate", "footerTemplate"],
                    n = [];
                return angular.forEach(e, function(e) {
                    n.push(w.getTemplate(e))
                }), m.all(n)
            }, w.getTemplate = function(e) {
                var n = w.config[e],
                    t = w.gridId + e + ".html",
                    o = m.defer();
                if (n && !p.test(n)) h.get(n, {
                    cache: g
                }).success(function(e) {
                    g.put(t, e), o.resolve()
                }).error(function() {
                    o.reject("Could not load template: " + n)
                });
                else if (n) g.put(t, n), o.resolve();
                else {
                    var i = e + ".html";
                    g.put(t, g.get(i)), o.resolve()
                }
                return o.promise
            }, "object" == typeof w.config.data && (w.data = w.config.data), w.calcMaxCanvasHeight = function() {
                var e;
                return e = w.config.groups.length > 0 ? w.rowFactory.parsedData.filter(function(e) {
                    return !e[s]
                }).length * w.config.rowHeight : w.filteredRows.length * w.config.rowHeight
            }, w.elementDims = {
                scrollW: 0,
                scrollH: 0,
                rowIndexCellW: w.config.selectionCheckboxColumnWidth,
                rowSelectedCellW: w.config.selectionCheckboxColumnWidth,
                rootMaxW: 0,
                rootMaxH: 0
            }, w.setRenderedRows = function(e) {
                i.renderedRows.length = e.length;
                for (var n = 0; e.length > n; n++) !i.renderedRows[n] || e[n].isAggRow || i.renderedRows[n].isAggRow ? (i.renderedRows[n] = e[n].copy(), i.renderedRows[n].collapsed = e[n].collapsed, e[n].isAggRow || i.renderedRows[n].setVars(e[n])) : i.renderedRows[n].setVars(e[n]), i.renderedRows[n].rowIndex = e[n].rowIndex, i.renderedRows[n].offsetTop = e[n].offsetTop, i.renderedRows[n].selected = e[n].selected, e[n].renderedRowIndex = n;
                w.refreshDomSizes(), i.$emit("ngGridEventRows", e)
            }, w.minRowsToRender = function() {
                var e = i.viewportDimHeight() || 1;
                return Math.floor(e / w.config.rowHeight)
            }, w.refreshDomSizes = function() {
                var e = new P;
                e.outerWidth = w.elementDims.rootMaxW, e.outerHeight = w.elementDims.rootMaxH, w.rootDim = e, w.maxCanvasHt = w.calcMaxCanvasHeight()
            }, w.buildColumnDefsFromData = function() {
                w.config.columnDefs = [];
                var e = w.data[0];
                return e ? (d.forIn(e, function(e, n) {
-1 === w.config.excludeProperties.indexOf(n) && w.config.columnDefs.push({
    field: n
})
                }), void 0) : (w.lateBoundColumns = !0, void 0)
            }, w.buildColumns = function() {
                var e = w.config.columnDefs,
                    n = [];
                if (e || (w.buildColumnDefsFromData(), e = w.config.columnDefs), w.config.showSelectionCheckbox && n.push(new T({
                    colDef: {
                        field: "✔",
                        width: w.elementDims.rowSelectedCellW,
                        sortable: !1,
                        resizable: !1,
                        groupable: !1,
                        headerCellTemplate: g.get(i.gridId + "checkboxHeaderTemplate.html"),
                        cellTemplate: g.get(i.gridId + "checkboxCellTemplate.html"),
                        pinned: w.config.pinSelectionCheckbox
                    },
                    index: 0,
                    headerRowHeight: w.config.headerRowHeight,
                    sortCallback: w.sortData,
                    resizeOnDataCallback: w.resizeOnData,
                    enableResize: w.config.enableColumnResize,
                    enableSort: w.config.enableSorting,
                    enablePinning: w.config.enablePinning
                }, i, w, a, g, d)), e.length > 0) {
                    var t = w.config.showSelectionCheckbox ? 1 : 0,
                        o = i.configGroups.length;
                    i.configGroups.length = 0, angular.forEach(e, function(e, r) {
                        r += t;
                        var l = new T({
                            colDef: e,
                            index: r + o,
                            originalIndex: r,
                            headerRowHeight: w.config.headerRowHeight,
                            sortCallback: w.sortData,
                            resizeOnDataCallback: w.resizeOnData,
                            enableResize: w.config.enableColumnResize,
                            enableSort: w.config.enableSorting,
                            enablePinning: w.config.enablePinning,
                            enableCellEdit: w.config.enableCellEdit || w.config.enableCellEditOnFocus,
                            cellEditableCondition: w.config.cellEditableCondition
                        }, i, w, a, g, d),
                            s = w.config.groups.indexOf(e.field); -1 !== s && (l.isGroupedBy = !0, i.configGroups.splice(s, 0, l), l.groupIndex = i.configGroups.length), n.push(l)
                    }), i.columns = n, w.config.groups.length > 0 && w.rowFactory.getGrouping(w.config.groups)
                }
            }, w.configureColumnWidths = function() {
                var e = [],
                    n = [],
                    t = 0,
                    o = 0,
                    r = {};
                if (angular.forEach(i.columns, function(e, n) {
                    if (d.isNullOrUndefined(e.originalIndex)) e.isAggCol && e.visible && (o += 25);
                    else {
                        var t = e.originalIndex;
                        w.config.showSelectionCheckbox && (0 === e.originalIndex && e.visible && (o += w.config.selectionCheckboxColumnWidth), t--), r[t] = n
                    }
                }), angular.forEach(w.config.columnDefs, function(l, a) {
                    var s = i.columns[r[a]];
                    l.index = a;
                    var c, g = !1;
                    if (d.isNullOrUndefined(l.width) ? l.width = "*" : (g = isNaN(l.width) ? d.endsWith(l.width, "%") : !1, c = g ? l.width : parseInt(l.width, 10)), isNaN(c)) {
                        if (c = l.width, "auto" === c) {
                            s.width = s.minWidth, o += s.width;
                            var u = s;
                            return i.$on("$destroy", i.$on("ngGridEventData", function() {
                                w.resizeOnData(u)
                            })), void 0
                        }
                        if (-1 !== c.indexOf("*")) return s.visible !== !1 && (t += c.length), e.push(l), void 0;
                        if (g) return n.push(l), void 0;
                        throw 'unable to parse column width, use percentage ("10%","20%", etc...) or "*" to use remaining width of grid'
                    }
                    s.visible !== !1 && (o += s.width = parseInt(s.width, 10))
                }), n.length > 0) {
                    w.config.maintainColumnRatios = w.config.maintainColumnRatios !== !1;
                    var l = 0,
                        s = 0;
                    angular.forEach(n, function(e) {
                        var n = i.columns[r[e.index]],
                            t = parseFloat(e.width) / 100;
                        l += t, n.visible || (s += t)
                    });
                    var c = l - s;
                    angular.forEach(n, function(e) {
                        var n = i.columns[r[e.index]],
                            t = parseFloat(e.width) / 100;
                        t /= s > 0 ? c : l;
                        var a = w.rootDim.outerWidth * l;
                        n.width = a * t, o += n.width
                    })
                }
                if (e.length > 0) {
                    w.config.maintainColumnRatios = w.config.maintainColumnRatios !== !1;
                    var g = w.rootDim.outerWidth - o;
                    w.maxCanvasHt > i.viewportDimHeight() && (g -= a.ScrollW);
                    var u = Math.floor(g / t);
                    angular.forEach(e, function(n, t) {
                        var l = i.columns[r[n.index]];
                        l.width = u * n.width.length, l.width < l.minWidth && (l.width = l.minWidth), l.visible !== !1 && (o += l.width);
                        var s = t === e.length - 1;
                        if (s && w.rootDim.outerWidth > o) {
                            var c = w.rootDim.outerWidth - o;
                            w.maxCanvasHt > i.viewportDimHeight() && (c -= a.ScrollW), l.width += c
                        }
                    })
                }
            }, w.init = function() {
                return w.initTemplates().then(function() {
                    i.selectionProvider = new H(w, i, f, d), i.domAccessProvider = new I(w), w.rowFactory = new G(w, i, a, g, d), w.searchProvider = new k(i, w, c, d), w.styleProvider = new F(i, w), i.$on("$destroy", i.$watch("configGroups", function(e) {
                        var n = [];
                        angular.forEach(e, function(e) {
                            n.push(e.field || e)
                        }), w.config.groups = n, w.rowFactory.filteredRowsChanged(), i.$emit("ngGridEventGroups", e)
                    }, !0)), i.$on("$destroy", i.$watch("columns", function(e) {
                        i.isColumnResizing || a.RebuildGrid(i, w), i.$emit("ngGridEventColumns", e)
                    }, !0)), i.$on("$destroy", i.$watch(function() {
                        return r.i18n
                    }, function(e) {
                        d.seti18n(i, e)
                    })), w.maxCanvasHt = w.calcMaxCanvasHeight(), w.config.sortInfo.fields && w.config.sortInfo.fields.length > 0 && i.$on("$destroy", i.$watch(function() {
                        return w.config.sortInfo
                    }, function() {
                        l.isSorting || (w.sortColumnsInit(), i.$emit("ngGridEventSorted", w.config.sortInfo))
                    }, !0))
                })
            }, w.resizeOnData = function(e) {
                var t = e.minWidth,
                    o = d.getElementsByClassName("col" + e.index);
                angular.forEach(o, function(e, o) {
                    var i;
                    if (0 === o) {
                        var r = n(e).find(".ngHeaderText");
                        i = d.visualLength(r) + 10
                    } else {
                        var l = n(e).find(".ngCellText");
                        i = d.visualLength(l) + 10
                    }
                    i > t && (t = i)
                }), e.width = e.longest = Math.min(e.maxWidth, t + 7), a.BuildStyles(i, w, !0)
            }, w.lastSortedColumns = [], w.sortData = function(e, t) {
                if (t && t.shiftKey && w.config.sortInfo) {
                    var o = w.config.sortInfo.columns.indexOf(e); -1 === o ? (1 === w.config.sortInfo.columns.length && (w.config.sortInfo.columns[0].sortPriority = 1), w.config.sortInfo.columns.push(e), e.sortPriority = w.config.sortInfo.columns.length, w.config.sortInfo.fields.push(e.field), w.config.sortInfo.directions.push(e.sortDirection), w.lastSortedColumns.push(e)) : w.config.sortInfo.directions[o] = e.sortDirection, i.$emit("ngGridEventSorted", w.config.sortInfo)
                } else if (!w.config.useExternalSorting || w.config.useExternalSorting && w.config.sortInfo) {
                    var r = n.isArray(e);
                    w.config.sortInfo.columns.length = 0, w.config.sortInfo.fields.length = 0, w.config.sortInfo.directions.length = 0;
                    var l = function(e) {
                        w.config.sortInfo.columns.push(e), w.config.sortInfo.fields.push(e.field), w.config.sortInfo.directions.push(e.sortDirection), w.lastSortedColumns.push(e)
                    };
                    r ? angular.forEach(e, function(e, n) {
                        e.sortPriority = n + 1, l(e)
                    }) : (w.clearSortingData(e), e.sortPriority = void 0, l(e)), w.sortActual(), w.searchProvider.evalFilter(), i.$emit("ngGridEventSorted", w.config.sortInfo)
                }
            }, w.sortColumnsInit = function() {
                w.config.sortInfo.columns ? w.config.sortInfo.columns.length = 0 : w.config.sortInfo.columns = [];
                var e = [];
                angular.forEach(i.columns, function(n) {
                    var t = w.config.sortInfo.fields.indexOf(n.field); -1 !== t && (n.sortDirection = w.config.sortInfo.directions[t] || "asc", e[t] = n)
                }), 1 === e.length ? w.sortData(e[0]) : w.sortData(e)
            }, w.sortActual = function() {
                if (!w.config.useExternalSorting) {
                    var e = w.data.slice(0);
                    angular.forEach(e, function(e, n) {
                        var t = w.rowMap[n];
                        if (void 0 !== t) {
                            var o = w.rowCache[t];
                            void 0 !== o && (e.preSortSelected = o.selected, e.preSortIndex = n)
                        }
                    }), l.Sort(w.config.sortInfo, e), angular.forEach(e, function(e, n) {
                        w.rowCache[n].entity = e, w.rowCache[n].selected = e.preSortSelected, w.rowMap[e.preSortIndex] = n, delete e.preSortSelected, delete e.preSortIndex
                    })
                }
            }, w.clearSortingData = function(e) {
                e ? (angular.forEach(w.lastSortedColumns, function(n) {
                    e.index !== n.index && (n.sortDirection = "", n.sortPriority = null)
                }), w.lastSortedColumns[0] = e, w.lastSortedColumns.length = 1) : (angular.forEach(w.lastSortedColumns, function(e) {
                    e.sortDirection = "", e.sortPriority = null
                }), w.lastSortedColumns = [])
            }, w.fixColumnIndexes = function() {
                for (var e = 0; i.columns.length > e; e++) i.columns[e].index = e
            }, w.fixGroupIndexes = function() {
                angular.forEach(i.configGroups, function(e, n) {
                    e.groupIndex = n + 1
                })
            }, i.elementsNeedMeasuring = !0, i.columns = [], i.renderedRows = [], i.renderedColumns = [], i.headerRow = null, i.rowHeight = w.config.rowHeight, i.jqueryUITheme = w.config.jqueryUITheme, i.showSelectionCheckbox = w.config.showSelectionCheckbox, i.enableCellSelection = w.config.enableCellSelection, i.enableCellEditOnFocus = w.config.enableCellEditOnFocus, i.footer = null, i.selectedItems = w.config.selectedItems, i.multiSelect = w.config.multiSelect, i.showFooter = w.config.showFooter, i.footerRowHeight = i.showFooter ? w.config.footerRowHeight : 0, i.showColumnMenu = w.config.showColumnMenu, i.forceSyncScrolling = w.config.forceSyncScrolling, i.showMenu = !1, i.configGroups = [], i.gridId = w.gridId, i.enablePaging = w.config.enablePaging, i.pagingOptions = w.config.pagingOptions, i.i18n = {}, d.seti18n(i, w.config.i18n), i.adjustScrollLeft = function(e) {
                for (var n = 0, t = 0, o = i.columns.length, r = [], l = !w.config.enableColumnHeavyVirt, s = 0, c = function(e) {
                    l ? r.push(e) : i.renderedColumns[s] ? i.renderedColumns[s].setVars(e) : i.renderedColumns[s] = e.copy(), s++
                }, g = 0; o > g; g++) {
                    var d = i.columns[g];
                    if (d.visible !== !1) {
                        var u = d.width + n;
                        if (d.pinned) {
                            c(d);
                            var f = g > 0 ? e + t : e;
                            a.setColLeft(d, f, w), t += d.width
                        } else u >= e && e + w.rootDim.outerWidth >= n && c(d);
                        n += d.width
                    }
                }
                l && (i.renderedColumns = r)
            }, w.prevScrollTop = 0, w.prevScrollIndex = 0, i.adjustScrollTop = function(e, n) {
                if (w.prevScrollTop !== e || n) {
                    e > 0 && w.$viewport[0].scrollHeight - e <= w.$viewport.outerHeight() && i.$emit("ngGridEventScroll");
                    var r, l = Math.floor(e / w.config.rowHeight);
                    if (w.filteredRows.length > w.config.virtualizationThreshold) {
                        if (e > w.prevScrollTop && w.prevScrollIndex + o > l) return;
                        if (w.prevScrollTop > e && l > w.prevScrollIndex - o) return;
                        r = new R(Math.max(0, l - t), l + w.minRowsToRender() + t)
                    } else {
                        var a = i.configGroups.length > 0 ? w.rowFactory.parsedData.length : w.filteredRows.length;
                        r = new R(0, Math.max(a, w.minRowsToRender() + t))
                    }
                    w.prevScrollTop = e, w.rowFactory.UpdateViewableRange(r), w.prevScrollIndex = l
                }
            }, i.toggleShowMenu = function() {
                i.showMenu = !i.showMenu
            }, i.toggleSelectAll = function(e, n) {
                i.selectionProvider.toggleSelectAll(e, !1, n)
            }, i.totalFilteredItemsLength = function() {
                return w.filteredRows.length
            }, i.showGroupPanel = function() {
                return w.config.showGroupPanel
            }, i.topPanelHeight = function() {
                return w.config.showGroupPanel === !0 ? w.config.headerRowHeight + 32 : w.config.headerRowHeight
            }, i.viewportDimHeight = function() {
                return Math.max(0, w.rootDim.outerHeight - i.topPanelHeight() - i.footerRowHeight - 2)
            }, i.groupBy = function(e) {
                if (!(1 > w.data.length) && e.groupable && e.field) {
                    e.sortDirection || e.sort({
                        shiftKey: i.configGroups.length > 0 ? !0 : !1
                    });
                    var n = i.configGroups.indexOf(e); -1 === n ? (e.isGroupedBy = !0, i.configGroups.push(e), e.groupIndex = i.configGroups.length) : i.removeGroup(n), w.$viewport.scrollTop(0), a.digest(i)
                }
            }, i.removeGroup = function(e) {
                var n = i.columns.filter(function(n) {
                    return n.groupIndex === e + 1
                })[0];
                n.isGroupedBy = !1, n.groupIndex = 0, i.columns[e].isAggCol && (i.columns.splice(e, 1), i.configGroups.splice(e, 1), w.fixGroupIndexes()), 0 === i.configGroups.length && (w.fixColumnIndexes(), a.digest(i)), i.adjustScrollLeft(0)
            }, i.togglePin = function(e) {
                for (var n = e.index, t = 0, o = 0; i.columns.length > o && i.columns[o].pinned; o++) t++;
                e.pinned && (t = Math.max(e.originalIndex, t - 1)), e.pinned = !e.pinned, i.columns.splice(n, 1), i.columns.splice(t, 0, e), w.fixColumnIndexes(), a.BuildStyles(i, w, !0), w.$viewport.scrollLeft(w.$viewport.scrollLeft() - e.width)
            }, i.totalRowWidth = function() {
                for (var e = 0, n = i.columns, t = 0; n.length > t; t++) n[t].visible !== !1 && (e += n[t].width);
                return e
            }, i.headerScrollerDim = function() {
                var e = i.viewportDimHeight(),
                    n = w.maxCanvasHt,
                    t = n > e,
                    o = new P;
                return o.autoFitHeight = !0, o.outerWidth = i.totalRowWidth(), t ? o.outerWidth += w.elementDims.scrollW : w.elementDims.scrollH >= n - e && (o.outerWidth += w.elementDims.scrollW), o
            }
        },
        R = function(e, n) {
            this.topRow = e, this.bottomRow = n
        },
        E = function(e, n, t, o, i) {
            this.entity = e, this.config = n, this.selectionProvider = t, this.rowIndex = o, this.utils = i, this.selected = t.getSelection(e), this.cursor = this.config.enableRowSelection && !this.config.selectWithCheckboxOnly ? "pointer" : "default", this.beforeSelectionChange = n.beforeSelectionChangeCallback, this.afterSelectionChange = n.afterSelectionChangeCallback, this.offsetTop = this.rowIndex * n.rowHeight, this.rowDisplayIndex = 0
        };
    E.prototype.setSelection = function(e) {
        this.selectionProvider.setSelection(this, e), this.selectionProvider.lastClickedRow = this
    }, E.prototype.continueSelection = function(e) {
        this.selectionProvider.ChangeSelection(this, e)
    }, E.prototype.ensureEntity = function(e) {
        this.entity !== e && (this.entity = e, this.selected = this.selectionProvider.getSelection(this.entity))
    }, E.prototype.toggleSelected = function(e) {
        if (!this.config.enableRowSelection && !this.config.enableCellSelection) return !0;
        var n = e.target || e;
        return "checkbox" === n.type && "ngSelectionCell ng-scope" !== n.parentElement.className ? !0 : this.config.selectWithCheckboxOnly && "checkbox" !== n.type ? (this.selectionProvider.lastClickedRow = this, !0) : (this.beforeSelectionChange(this, e) && this.continueSelection(e), !1)
    }, E.prototype.alternatingRowClass = function() {
        var e = 0 === this.rowIndex % 2,
            n = {
                ngRow: !0,
                selected: this.selected,
                even: e,
                odd: !e,
                "ui-state-default": this.config.jqueryUITheme && e,
                "ui-state-active": this.config.jqueryUITheme && !e
            };
        return n
    }, E.prototype.getProperty = function(e) {
        return this.utils.evalProperty(this.entity, e)
    }, E.prototype.copy = function() {
        return this.clone = new E(this.entity, this.config, this.selectionProvider, this.rowIndex, this.utils), this.clone.isClone = !0, this.clone.elm = this.elm, this.clone.orig = this, this.clone
    }, E.prototype.setVars = function(e) {
        e.clone = this, this.entity = e.entity, this.selected = e.selected, this.orig = e
    };
    var G = function(e, n, o, i, r) {
        var g = this;
        g.aggCache = {}, g.parentCache = [], g.dataChanged = !0, g.parsedData = [], g.rowConfig = {}, g.selectionProvider = n.selectionProvider, g.rowHeight = 30, g.numberOfAggregates = 0, g.groupedData = void 0, g.rowHeight = e.config.rowHeight, g.rowConfig = {
            enableRowSelection: e.config.enableRowSelection,
            rowClasses: e.config.rowClasses,
            selectedItems: n.selectedItems,
            selectWithCheckboxOnly: e.config.selectWithCheckboxOnly,
            beforeSelectionChangeCallback: e.config.beforeSelectionChange,
            afterSelectionChangeCallback: e.config.afterSelectionChange,
            jqueryUITheme: e.config.jqueryUITheme,
            enableCellSelection: e.config.enableCellSelection,
            rowHeight: e.config.rowHeight
        }, g.renderedRange = new R(0, e.minRowsToRender() + t), g.buildEntityRow = function(e, n) {
            return new E(e, g.rowConfig, g.selectionProvider, n, r)
        }, g.buildAggregateRow = function(n, t) {
            var o = g.aggCache[n.aggIndex];
            return o || (o = new x(n, g, g.rowConfig.rowHeight, e.config.groupsCollapsedByDefault), g.aggCache[n.aggIndex] = o), o.rowIndex = t, o.offsetTop = t * g.rowConfig.rowHeight, o
        }, g.UpdateViewableRange = function(e) {
            g.renderedRange = e, g.renderedChange()
        }, g.filteredRowsChanged = function() {
            e.lateBoundColumns && e.filteredRows.length > 0 && (e.config.columnDefs = void 0, e.buildColumns(), e.lateBoundColumns = !1, n.$evalAsync(function() {
                n.adjustScrollLeft(0)
            })), g.dataChanged = !0, e.config.groups.length > 0 && g.getGrouping(e.config.groups), g.UpdateViewableRange(g.renderedRange)
        }, g.renderedChange = function() {
            if (!g.groupedData || 1 > e.config.groups.length) return g.renderedChangeNoGroups(), e.refreshDomSizes(), void 0;
            g.wasGrouped = !0, g.parentCache = [];
            var n = 0,
                    t = g.parsedData.filter(function(e) {
                        return e.isAggRow ? e.parent && e.parent.collapsed ? !1 : !0 : (e[s] || (e.rowIndex = n++), !e[s])
                    });
            g.totalRows = t.length;
            for (var o = [], i = g.renderedRange.topRow; g.renderedRange.bottomRow > i; i++) t[i] && (t[i].offsetTop = i * e.config.rowHeight, o.push(t[i]));
            e.setRenderedRows(o)
        }, g.renderedChangeNoGroups = function() {
            for (var n = [], t = g.renderedRange.topRow; g.renderedRange.bottomRow > t; t++) e.filteredRows[t] && (e.filteredRows[t].rowIndex = t, e.filteredRows[t].offsetTop = t * e.config.rowHeight, n.push(e.filteredRows[t]));
            e.setRenderedRows(n)
        }, g.fixRowCache = function() {
            var n = e.data.length,
                    t = n - e.rowCache.length;
            if (0 > t) e.rowCache.length = e.rowMap.length = n;
            else
                for (var o = e.rowCache.length; n > o; o++) e.rowCache[o] = e.rowFactory.buildEntityRow(e.data[o], o)
        }, g.parseGroupData = function(e) {
            if (e.values)
                for (var n = 0; e.values.length > n; n++) g.parentCache[g.parentCache.length - 1].children.push(e.values[n]), g.parsedData.push(e.values[n]);
            else
                for (var t in e)
                if (t !== l && t !== a && t !== c && e.hasOwnProperty(t)) {
                var o = g.buildAggregateRow({
                    gField: e[l],
                    gLabel: t,
                    gDepth: e[a],
                    isAggRow: !0,
                    _ng_hidden_: !1,
                    children: [],
                    aggChildren: [],
                    aggIndex: g.numberOfAggregates,
                    aggLabelFilter: e[c].aggLabelFilter
                }, 0);
                g.numberOfAggregates++, o.parent = g.parentCache[o.depth - 1], o.parent && (o.parent.collapsed = !1, o.parent.aggChildren.push(o)), g.parsedData.push(o), g.parentCache[o.depth] = o, g.parseGroupData(e[t])
            }
        }, g.getGrouping = function(t) {
            function d(e, n) {
                return e.filter(function(e) {
                    return e.field === n
                })
            }
            g.aggCache = [], g.numberOfAggregates = 0, g.groupedData = {};
            for (var u = e.filteredRows, f = t.length, h = n.columns, p = 0; u.length > p; p++) {
                var m = u[p].entity;
                if (!m) return;
                u[p][s] = e.config.groupsCollapsedByDefault;
                for (var v = g.groupedData, w = 0; t.length > w; w++) {
                    var C = t[w],
                            b = d(h, C)[0],
                            y = r.evalProperty(m, C);
                    y = "" === y || null === y ? "null" : "" + y, v[y] || (v[y] = {}), v[l] || (v[l] = C), v[a] || (v[a] = w), v[c] || (v[c] = b), v = v[y]
                }
                v.values || (v.values = []), v.values.push(u[p])
            }
            if (h.length > 0)
                for (var S = 0; t.length > S; S++) !h[S].isAggCol && f >= S && h.splice(0, 0, new T({
                    colDef: {
                        field: "",
                        width: 25,
                        sortable: !1,
                        resizable: !1,
                        headerCellTemplate: '<div class="ngAggHeader"></div>',
                        pinned: e.config.pinSelectionCheckbox
                    },
                    enablePinning: e.config.enablePinning,
                    isAggCol: !0,
                    headerRowHeight: e.config.headerRowHeight
                }, n, e, o, i, r));
            e.fixColumnIndexes(), n.adjustScrollLeft(0), g.parsedData.length = 0, g.parseGroupData(g.groupedData), g.fixRowCache()
        }, e.config.groups.length > 0 && e.filteredRows.length > 0 && g.getGrouping(e.config.groups)
    },
        k = function(e, t, o, i) {
            var r = this,
                l = [];
            r.extFilter = t.config.filterOptions.useExternalFilter, e.showFilter = t.config.showFilter, e.filterText = "", r.fieldMap = {};
            var a = function(e) {
                var n = {};
                for (var t in e) e.hasOwnProperty(t) && (n[t.toLowerCase()] = e[t]);
                return n
            },
                s = function(e) {
                    if ("object" == typeof e) {
                        var n = [];
                        for (var t in e) n = n.concat(s(e[t]));
                        return n
                    }
                    return [e]
                },
                c = function(e, n, t) {
                    var i;
                    for (var r in n)
                        if (n.hasOwnProperty(r)) {
                        var l = t[r.toLowerCase()],
                                s = n[r];
                        if ("object" != typeof s || s instanceof Date) {
                            var g = null,
                                    d = null;
                            if (l && l.cellFilter && (d = l.cellFilter.split(":"), g = o(d[0])), null !== s && void 0 !== s) {
                                if ("function" == typeof g) {
                                    var u = "" + g(s, d[1] ? d[1].slice(1, -1) : "");
                                    i = e.regex.test(u)
                                } else i = e.regex.test("" + s);
                                if (i) return !0
                            }
                        } else {
                            var f = a(l);
                            if (i = c(e, s, f)) return !0
                        }
                    }
                    return !1
                },
                g = function(e, n) {
                    var t, l = r.fieldMap[e.columnDisplay];
                    if (!l) return !1;
                    var a = l.cellFilter.split(":"),
                        c = l.cellFilter ? o(a[0]) : null,
                        g = n[e.column] || n[l.field.split(".")[0]] || i.evalProperty(n, l.field);
                    if (null === g || void 0 === g) return !1;
                    if ("function" == typeof c) {
                        var d = "" + c("object" == typeof g ? u(g, l.field) : g, a[1]);
                        t = e.regex.test(d)
                    } else {
                        var f = s(u(g, l.field));
                        for (var h in f) t |= e.regex.test(f[h])
                    }
                    return t ? !0 : !1
                },
                d = function(e) {
                    for (var n = 0, t = l.length; t > n; n++) {
                        var o, i = l[n];
                        if (o = i.column ? g(i, e) : c(i, e, r.fieldMap), !o) return !1
                    }
                    return !0
                };
            r.evalFilter = function() {
                t.filteredRows = 0 === l.length ? t.rowCache : t.rowCache.filter(function(e) {
                    return d(e.entity)
                });
                for (var e = 0; t.filteredRows.length > e; e++) t.filteredRows[e].rowIndex = e;
                t.rowFactory.filteredRowsChanged()
            };
            var u = function(e, n) {
                if ("object" != typeof e || "string" != typeof n) return e;
                var t = n.split("."),
                        o = e;
                if (t.length > 1) {
                    for (var i = 1, r = t.length; r > i; i++)
                        if (o = o[t[i]], !o) return e;
                    return o
                }
                return e
            },
                f = function(e, n) {
                    try {
                        return RegExp(e, n)
                    } catch (t) {
                        return RegExp(e.replace(/(\^|\$|\(|\)|<|>|\[|\]|\{|\}|\\|\||\.|\*|\+|\?)/g, "\\$1"))
                    }
                },
                h = function(e) {
                    l = [];
                    var t;
                    if (t = n.trim(e))
                        for (var o = t.split(";"), i = 0; o.length > i; i++) {
                        var r = o[i].split(":");
                        if (r.length > 1) {
                            var a = n.trim(r[0]),
                                    s = n.trim(r[1]);
                            a && s && l.push({
                                column: a,
                                columnDisplay: a.replace(/\s+/g, "").toLowerCase(),
                                regex: f(s, "i")
                            })
                        } else {
                            var c = n.trim(r[0]);
                            c && l.push({
                                column: "",
                                regex: f(c, "i")
                            })
                        }
                    }
                };
            r.extFilter || e.$on("$destroy", e.$watch("columns", function(e) {
                for (var n = 0; e.length > n; n++) {
                    var t = e[n];
                    if (t.field)
                        if (t.field.match(/\./g)) {
                        for (var o = t.field.split("."), i = r.fieldMap, l = 0; o.length - 1 > l; l++) i[o[l]] = i[o[l]] || {}, i = i[o[l]];
                        i[o[o.length - 1]] = t
                    } else r.fieldMap[t.field.toLowerCase()] = t;
                    t.displayName && (r.fieldMap[t.displayName.toLowerCase().replace(/\s+/g, "")] = t)
                }
            })), e.$on("$destroy", e.$watch(function() {
                return t.config.filterOptions.filterText
            }, function(n) {
                e.filterText = n
            })), e.$on("$destroy", e.$watch("filterText", function(n) {
                r.extFilter || (e.$emit("ngGridEventFilter", n), h(n), r.evalFilter())
            }))
        },
        H = function(e, n, t, o) {
            var i = this;
            i.multi = e.config.multiSelect, i.selectedItems = e.config.selectedItems, i.selectedIndex = e.config.selectedIndex, i.lastClickedRow = void 0, i.ignoreSelectedItemChanges = !1;
            var r = e.config.primaryKey;
            r && (r = o.preEval("entity." + e.config.primaryKey)), i.pKeyParser = t(r), i.ChangeSelection = function(t, o) {
                var r = o.which || o.keyCode,
                    l = 40 === r || 38 === r;
                if (o && o.shiftKey && !o.keyCode && i.multi && e.config.enableRowSelection) {
                    if (i.lastClickedRow) {
                        var a;
                        a = n.configGroups.length > 0 ? e.rowFactory.parsedData.filter(function(e) {
                            return !e.isAggRow
                        }) : e.filteredRows;
                        var s = t.rowIndex,
                            c = i.lastClickedRowIndex;
                        if (s === c) return !1;
                        c > s ? (s ^= c, c = s ^ c, s ^= c, s--) : c++;
                        for (var g = []; s >= c; c++) g.push(a[c]);
                        if (g[g.length - 1].beforeSelectionChange(g, o)) {
                            for (var d = 0; g.length > d; d++) {
                                var u = g[d],
                                    f = u.selected;
                                u.selected = !f, u.clone && (u.clone.selected = u.selected);
                                var h = i.selectedItems.indexOf(u.entity); -1 === h ? i.selectedItems.push(u.entity) : i.selectedItems.splice(h, 1)
                            }
                            g[g.length - 1].afterSelectionChange(g, o)
                        }
                        return i.lastClickedRow = t, i.lastClickedRowIndex = t.rowIndex, !0
                    }
                } else i.multi ? (!o.keyCode || l && !e.config.selectWithCheckboxOnly) && i.setSelection(t, !t.selected) : i.lastClickedRow === t ? i.setSelection(i.lastClickedRow, e.config.keepLastSelected ? !0 : !t.selected) : (i.lastClickedRow && i.setSelection(i.lastClickedRow, !1), i.setSelection(t, !t.selected));
                return i.lastClickedRow = t, i.lastClickedRowIndex = t.rowIndex, !0
            }, i.getSelection = function(e) {
                return -1 !== i.getSelectionIndex(e)
            }, i.getSelectionIndex = function(n) {
                var t = -1;
                if (e.config.primaryKey) {
                    var o = i.pKeyParser({
                        entity: n
                    });
                    angular.forEach(i.selectedItems, function(e, n) {
                        o === i.pKeyParser({
                            entity: e
                        }) && (t = n)
                    })
                } else t = i.selectedItems.indexOf(n);
                return t
            }, i.setSelection = function(n, t) {
                if (e.config.enableRowSelection) {
                    if (t)-1 === i.getSelectionIndex(n.entity) && (!i.multi && i.selectedItems.length > 0 && i.toggleSelectAll(!1, !0), i.selectedItems.push(n.entity));
                    else {
                        var o = i.getSelectionIndex(n.entity); -1 !== o && i.selectedItems.splice(o, 1)
                    }
                    n.selected = t, n.orig && (n.orig.selected = t), n.clone && (n.clone.selected = t), n.afterSelectionChange(n)
                }
            }, i.toggleSelectAll = function(n, t, o) {
                var r, l, a = o ? e.filteredRows : e.rowCache;
                if (t || e.config.beforeSelectionChange(a, n)) {
                    !o && i.selectedItems.length > 0 && (i.selectedItems.length = 0);
                    for (var s = 0; a.length > s; s++) r = a[s].selected, a[s].selected = n, a[s].clone && (a[s].clone.selected = n), !r && n ? i.selectedItems.push(a[s].entity) : r && !n && (l = i.getSelectionIndex(a[s].entity), l > -1 && i.selectedItems.splice(l, 1));
                    t || e.config.afterSelectionChange(a, n)
                }
            }
        },
        F = function(e, n) {
            e.headerCellStyle = function(e) {
                return {
                    height: e.headerRowHeight + "px"
                }
            }, e.rowStyle = function(n) {
                var t = {
                    top: n.offsetTop + "px",
                    height: e.rowHeight + "px"
                };
                return n.isAggRow && (t.left = n.offsetLeft), t
            }, e.canvasStyle = function() {
                return {
                    height: n.maxCanvasHt + "px"
                }
            }, e.headerScrollerStyle = function() {
                return {
                    height: n.config.headerRowHeight + "px"
                }
            }, e.topPanelStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: e.topPanelHeight() + "px"
                }
            }, e.headerStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: n.config.headerRowHeight + "px"
                }
            }, e.groupPanelStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: "32px"
                }
            }, e.viewportStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: e.viewportDimHeight() + "px"
                }
            }, e.footerStyle = function() {
                return {
                    width: n.rootDim.outerWidth + "px",
                    height: e.footerRowHeight + "px"
                }
            }
        };
    b.directive("ngCellHasFocus", ["$domUtilityService", function(e) {
        var n = function(n) {
            n.isFocused = !0, e.digest(n), n.$broadcast("ngGridEventStartCellEdit"), n.$emit("ngGridEventStartCellEdit"), n.$on("$destroy", n.$on("ngGridEventEndCellEdit", function() {
                n.isFocused = !1, e.digest(n)
            }))
        };
        return function(e, t) {
            function o() {
                return e.enableCellEditOnFocus ? c = !0 : t.focus(), !0
            }

            function i(o) {
                e.enableCellEditOnFocus && (o.preventDefault(), c = !1, n(e, t))
            }

            function r() {
                return s = !0, e.enableCellEditOnFocus && !c && n(e, t), !0
            }

            function l() {
                return s = !1, !0
            }

            function a(o) {
                return e.enableCellEditOnFocus || (s && 37 !== o.keyCode && 38 !== o.keyCode && 39 !== o.keyCode && 40 !== o.keyCode && 9 !== o.keyCode && !o.shiftKey && 13 !== o.keyCode && n(e, t), s && o.shiftKey && o.keyCode >= 65 && 90 >= o.keyCode && n(e, t), 27 === o.keyCode && t.focus()), !0
            }
            var s = !1,
                c = !1;
            e.editCell = function() {
                e.enableCellEditOnFocus || setTimeout(function() {
                    n(e, t)
                }, 0)
            }, t.bind("mousedown", o), t.bind("click", i), t.bind("focus", r), t.bind("blur", l), t.bind("keydown", a), t.on("$destroy", function() {
                t.off("mousedown", o), t.off("click", i), t.off("focus", r), t.off("blur", l), t.off("keydown", a)
            })
        }
    } ]), b.directive("ngCellText", function() {
        return function(e, n) {
            function t(e) {
                e.preventDefault()
            }

            function o(e) {
                e.preventDefault()
            }
            n.bind("mouseover", t), n.bind("mouseleave", o), n.on("$destroy", function() {
                n.off("mouseover", t), n.off("mouseleave", o)
            })
        }
    }), b.directive("ngCell", ["$compile", "$domUtilityService", "$utilityService", function(e, t, o) {
        var i = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(t, i) {
                        var r, l = t.col.cellTemplate.replace(d, o.preEval("row.entity." + t.col.field));
                        t.col.enableCellEdit ? (r = t.col.cellEditTemplate, r = r.replace(h, t.col.cellEditableCondition), r = r.replace(u, l), r = r.replace(f, t.col.editableCellTemplate.replace(d, o.preEval("row.entity." + t.col.field)))) : r = l;
                        var a = n(r);
                        i.append(a), e(a)(t), t.enableCellSelection && -1 === a[0].className.indexOf("ngSelectionCell") && (a[0].setAttribute("tabindex", 0), a.addClass("ngCellElement"))
                    },
                    post: function(e, n) {
                        e.enableCellSelection && e.domAccessProvider.selectionHandlers(e, n), e.$on("$destroy", e.$on("ngGridEventDigestCell", function() {
                            t.digest(e)
                        }))
                    }
                }
            }
        };
        return i
    } ]), b.directive("ngEditCellIf", [function() {
        return {
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            restrict: "A",
            compile: function(e, n, t) {
                return function(e, n, o) {
                    var i, r;
                    e.$on("$destroy", e.$watch(o.ngEditCellIf, function(o) {
                        i && (i.remove(), i = void 0), r && (r.$destroy(), r = void 0), o && (r = e.$new(), t(r, function(e) {
                            i = e, n.after(e)
                        }))
                    }))
                }
            }
        }
    } ]), b.directive("ngGridFooter", ["$compile", "$templateCache", function(e, n) {
        var t = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(t, o) {
                        0 === o.children().length && o.append(e(n.get(t.gridId + "footerTemplate.html"))(t))
                    }
                }
            }
        };
        return t
    } ]), b.directive("ngGridMenu", ["$compile", "$templateCache", function(e, n) {
        var t = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(t, o) {
                        0 === o.children().length && o.append(e(n.get(t.gridId + "menuTemplate.html"))(t))
                    }
                }
            }
        };
        return t
    } ]), b.directive("ngGrid", ["$compile", "$filter", "$templateCache", "$sortService", "$domUtilityService", "$utilityService", "$timeout", "$parse", "$http", "$q", function(e, t, o, i, r, l, a, s, c, g) {
        var d = {
            scope: !0,
            compile: function() {
                return {
                    pre: function(d, u, f) {
                        var h = n(u),
                            p = d.$eval(f.ngGrid);
                        p.gridDim = new P({
                            outerHeight: n(h).height(),
                            outerWidth: n(h).width()
                        });
                        var m = new L(d, p, i, r, t, o, l, a, s, c, g);
                        return d.$on("$destroy", function() {
                            p.gridDim = null, p.selectRow = null, p.selectItem = null, p.selectAll = null, p.selectVisible = null, p.groupBy = null, p.sortBy = null, p.gridId = null, p.ngGrid = null, p.$gridScope = null, p.$gridServices = null, d.domAccessProvider.grid = null, angular.element(m.styleSheet).remove(), m.styleSheet = null
                        }), m.init().then(function() {
                            if ("string" == typeof p.columnDefs ? d.$on("$destroy", d.$parent.$watch(p.columnDefs, function(e) {
                                return e ? (m.lateBoundColumns = !1, d.columns = [], m.config.columnDefs = e, m.buildColumns(), m.eventProvider.assignEvents(), r.RebuildGrid(d, m), void 0) : (m.refreshDomSizes(), m.buildColumns(), void 0)
                            }, !0)) : m.buildColumns(), "string" == typeof p.totalServerItems ? d.$on("$destroy", d.$parent.$watch(p.totalServerItems, function(e) {
                                d.totalServerItems = angular.isDefined(e) ? e : 0
                            })) : d.totalServerItems = 0, "string" == typeof p.data) {
                                var t = function(e) {
                                    m.data = n.extend([], e), m.rowFactory.fixRowCache(), angular.forEach(m.data, function(e, n) {
                                        var t = m.rowMap[n] || n;
                                        m.rowCache[t] && m.rowCache[t].ensureEntity(e), m.rowMap[t] = n
                                    }), m.searchProvider.evalFilter(), m.configureColumnWidths(), m.refreshDomSizes(), m.config.sortInfo.fields.length > 0 && (m.sortColumnsInit(), d.$emit("ngGridEventSorted", m.config.sortInfo)), d.$emit("ngGridEventData", m.gridId)
                                };
                                d.$on("$destroy", d.$parent.$watch(p.data, t)), d.$on("$destroy", d.$parent.$watch(p.data + ".length", function() {
                                    t(d.$eval(p.data)), d.adjustScrollTop(m.$viewport.scrollTop(), !0)
                                }))
                            }
                            return m.footerController = new D(d, m), u.addClass("ngGrid").addClass("" + m.gridId), p.enableHighlighting || u.addClass("unselectable"), p.jqueryUITheme && u.addClass("ui-widget"), u.append(e(o.get("gridTemplate.html"))(d)), r.AssignGridContainers(d, u, m), m.eventProvider = new $(m, d, r, a), p.selectRow = function(e, n) {
                                m.rowCache[e] && (m.rowCache[e].clone && m.rowCache[e].clone.setSelection(n ? !0 : !1), m.rowCache[e].setSelection(n ? !0 : !1))
                            }, p.selectItem = function(e, n) {
                                p.selectRow(m.rowMap[e], n)
                            }, p.selectAll = function(e) {
                                d.toggleSelectAll(e)
                            }, p.selectVisible = function(e) {
                                d.toggleSelectAll(e, !0)
                            }, p.groupBy = function(e) {
                                if (e) d.groupBy(d.columns.filter(function(n) {
                                    return n.field === e
                                })[0]);
                                else {
                                    var t = n.extend(!0, [], d.configGroups);
                                    angular.forEach(t, d.groupBy)
                                }
                            }, p.sortBy = function(e) {
                                var n = d.columns.filter(function(n) {
                                    return n.field === e
                                })[0];
                                n && n.sort()
                            }, p.gridId = m.gridId, p.ngGrid = m, p.$gridScope = d, p.$gridServices = {
                                SortService: i,
                                DomUtilityService: r,
                                UtilityService: l
                            }, d.$on("$destroy", d.$on("ngGridEventDigestGrid", function() {
                                r.digest(d.$parent)
                            })), d.$on("$destroy", d.$on("ngGridEventDigestGridParent", function() {
                                r.digest(d.$parent)
                            })), d.$evalAsync(function() {
                                d.adjustScrollLeft(0)
                            }), angular.forEach(p.plugins, function(e) {
                                "function" == typeof e && (e = new e);
                                var n = d.$new();
                                e.init(n, m, p.$gridServices), p.plugins[l.getInstanceType(e)] = e, d.$on("$destroy", function() {
                                    n.$destroy()
                                })
                            }), "function" == typeof p.init && p.init(m, d), null
                        })
                    }
                }
            }
        };
        return d
    } ]), b.directive("ngHeaderCell", ["$compile", function(e) {
        var n = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(n, t) {
                        t.append(e(n.col.headerCellTemplate)(n))
                    }
                }
            }
        };
        return n
    } ]), b.directive("ngHeaderRow", ["$compile", "$templateCache", function(e, n) {
        var t = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(t, o) {
                        0 === o.children().length && o.append(e(n.get(t.gridId + "headerRowTemplate.html"))(t))
                    }
                }
            }
        };
        return t
    } ]), b.directive("ngInput", [function() {
        return {
            require: "ngModel",
            link: function(e, n, t, o) {
                function i(t) {
                    switch (t.keyCode) {
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                            t.stopPropagation();
                            break;
                        case 27:
                            e.$$phase || e.$apply(function() {
                                o.$setViewValue(a), n.blur()
                            });
                            break;
                        case 13:
                            (e.enableCellEditOnFocus && e.totalFilteredItemsLength() - 1 > e.row.rowIndex && e.row.rowIndex > 0 || e.col.enableCellEdit) && n.blur()
                    }
                    return !0
                }

                function r(e) {
                    e.stopPropagation()
                }

                function l(e) {
                    e.stopPropagation()
                }
                var a, s = e.$watch("ngModel", function() {
                    a = o.$modelValue, s()
                });
                n.bind("keydown", i), n.bind("click", r), n.bind("mousedown", l), n.on("$destroy", function() {
                    n.off("keydown", i), n.off("click", r), n.off("mousedown", l)
                }), e.$on("$destroy", e.$on("ngGridEventStartCellEdit", function() {
                    n.focus(), n.select()
                })), angular.element(n).bind("blur", function() {
                    e.$emit("ngGridEventEndCellEdit")
                })
            }
        }
    } ]), b.directive("ngRow", ["$compile", "$domUtilityService", "$templateCache", function(e, n, t) {
        var o = {
            scope: !1,
            compile: function() {
                return {
                    pre: function(o, i) {
                        if (o.row.elm = i, o.row.clone && (o.row.clone.elm = i), o.row.isAggRow) {
                            var r = t.get(o.gridId + "aggregateTemplate.html");
                            r = o.row.aggLabelFilter ? r.replace(g, "| " + o.row.aggLabelFilter) : r.replace(g, ""), i.append(e(r)(o))
                        } else i.append(e(t.get(o.gridId + "rowTemplate.html"))(o));
                        o.$on("$destroy", o.$on("ngGridEventDigestRow", function() {
                            n.digest(o)
                        }))
                    }
                }
            }
        };
        return o
    } ]), b.directive("ngViewport", [function() {
        return function(e, n) {
            function t(n) {
                var t = n.target.scrollLeft,
                    o = n.target.scrollTop;
                return e.$headerContainer && e.$headerContainer.scrollLeft(t), e.adjustScrollLeft(t), e.adjustScrollTop(o), e.forceSyncScrolling ? s() : (clearTimeout(l), l = setTimeout(s, 150)), r = t, a = o, i = !1, !0
            }

            function o() {            
                return true; //i = !0, n.focus && n.focus(), !0
            }
            var i, r, l, a = 0,
                s = function() {
                    e.$root.$$phase || e.$digest()
                };
            n.bind("scroll", t), n.bind("mousewheel DOMMouseScroll", o), n.on("$destroy", function() {
                n.off("scroll", t), n.off("mousewheel DOMMouseScroll", o)
            }), e.enableCellSelection || e.domAccessProvider.selectionHandlers(e, n)
        }
    } ]), e.ngGrid.i18n.da = {
        ngAggregateLabel: "artikler",
        ngGroupPanelDescription: "Grupér rækker udfra en kolonne ved at trække dens overskift hertil.",
        ngSearchPlaceHolder: "Søg...",
        ngMenuText: "Vælg kolonner:",
        ngShowingItemsLabel: "Viste rækker:",
        ngTotalItemsLabel: "Rækker totalt:",
        ngSelectedItemsLabel: "Valgte rækker:",
        ngPageSizeLabel: "Side størrelse:",
        ngPagerFirstTitle: "Første side",
        ngPagerNextTitle: "Næste side",
        ngPagerPrevTitle: "Forrige side",
        ngPagerLastTitle: "Sidste side"
    }, e.ngGrid.i18n.de = {
        ngAggregateLabel: "eintrag",
        ngGroupPanelDescription: "Ziehen Sie eine Spaltenüberschrift hierhin um nach dieser Spalte zu gruppieren.",
        ngSearchPlaceHolder: "Suche...",
        ngMenuText: "Spalten auswählen:",
        ngShowingItemsLabel: "Zeige Einträge:",
        ngTotalItemsLabel: "Einträge gesamt:",
        ngSelectedItemsLabel: "Ausgewählte Einträge:",
        ngPageSizeLabel: "Einträge pro Seite:",
        ngPagerFirstTitle: "Erste Seite",
        ngPagerNextTitle: "Nächste Seite",
        ngPagerPrevTitle: "Vorherige Seite",
        ngPagerLastTitle: "Letzte Seite"
    }, e.ngGrid.i18n.en = {
        ngAggregateLabel: "items",
        ngGroupPanelDescription: "Drag a column header here and drop it to group by that column.",
        ngSearchPlaceHolder: "Search...",
        ngMenuText: "Choose Columns:",
        ngShowingItemsLabel: "Showing Items:",
        ngTotalItemsLabel: "Total Items:",
        ngSelectedItemsLabel: "Selected Items:",
        ngPageSizeLabel: "Page Size:",
        ngPagerFirstTitle: "First Page",
        ngPagerNextTitle: "Next Page",
        ngPagerPrevTitle: "Previous Page",
        ngPagerLastTitle: "Last Page"
    }, e.ngGrid.i18n.es = {
        ngAggregateLabel: "Artículos",
        ngGroupPanelDescription: "Arrastre un encabezado de columna aquí y soltarlo para agrupar por esa columna.",
        ngSearchPlaceHolder: "Buscar...",
        ngMenuText: "Elegir columnas:",
        ngShowingItemsLabel: "Artículos Mostrando:",
        ngTotalItemsLabel: "Artículos Totales:",
        ngSelectedItemsLabel: "Artículos Seleccionados:",
        ngPageSizeLabel: "Tamaño de Página:",
        ngPagerFirstTitle: "Primera Página",
        ngPagerNextTitle: "Página Siguiente",
        ngPagerPrevTitle: "Página Anterior",
        ngPagerLastTitle: "Última Página"
    }, e.ngGrid.i18n.fa = {
        ngAggregateLabel: "موردها",
        ngGroupPanelDescription: "یک عنوان ستون اینجا را بردار و به گروهی از آن ستون بیانداز.",
        ngSearchPlaceHolder: "جستجو...",
        ngMenuText: "انتخاب ستون‌ها:",
        ngShowingItemsLabel: "نمایش موردها:",
        ngTotalItemsLabel: "همهٔ موردها:",
        ngSelectedItemsLabel: "موردهای انتخاب‌شده:",
        ngPageSizeLabel: "اندازهٔ صفحه:",
        ngPagerFirstTitle: "صفحهٔ اول",
        ngPagerNextTitle: "صفحهٔ بعد",
        ngPagerPrevTitle: "صفحهٔ قبل",
        ngPagerLastTitle: "آخرین صفحه"
    }, e.ngGrid.i18n.fr = {
        ngAggregateLabel: "articles",
        ngGroupPanelDescription: "Faites glisser un en-tête de colonne ici et déposez-le vers un groupe par cette colonne.",
        ngSearchPlaceHolder: "Recherche...",
        ngMenuText: "Choisir des colonnes:",
        ngShowingItemsLabel: "Articles Affichage des:",
        ngTotalItemsLabel: "Nombre total d'articles:",
        ngSelectedItemsLabel: "Éléments Articles:",
        ngPageSizeLabel: "Taille de page:",
        ngPagerFirstTitle: "Première page",
        ngPagerNextTitle: "Page Suivante",
        ngPagerPrevTitle: "Page précédente",
        ngPagerLastTitle: "Dernière page"
    }, e.ngGrid.i18n.nl = {
        ngAggregateLabel: "items",
        ngGroupPanelDescription: "Sleep hier een kolomkop om op te groeperen.",
        ngSearchPlaceHolder: "Zoeken...",
        ngMenuText: "Kies kolommen:",
        ngShowingItemsLabel: "Toon items:",
        ngTotalItemsLabel: "Totaal items:",
        ngSelectedItemsLabel: "Geselecteerde items:",
        ngPageSizeLabel: "Pagina grootte:, ",
        ngPagerFirstTitle: "Eerste pagina",
        ngPagerNextTitle: "Volgende pagina",
        ngPagerPrevTitle: "Vorige pagina",
        ngPagerLastTitle: "Laatste pagina"
    }, e.ngGrid.i18n["pt-br"] = {
        ngAggregateLabel: "itens",
        ngGroupPanelDescription: "Arraste e solte uma coluna aqui para agrupar por essa coluna",
        ngSearchPlaceHolder: "Procurar...",
        ngMenuText: "Selecione as colunas:",
        ngShowingItemsLabel: "Mostrando os Itens:",
        ngTotalItemsLabel: "Total de Itens:",
        ngSelectedItemsLabel: "Items Selecionados:",
        ngPageSizeLabel: "Tamanho da Página:",
        ngPagerFirstTitle: "Primeira Página",
        ngPagerNextTitle: "Próxima Página",
        ngPagerPrevTitle: "Página Anterior",
        ngPagerLastTitle: "Última Página"
    }, e.ngGrid.i18n.ru = {
        ngAggregateLabel: "записи",
        ngGroupPanelDescription: "Перетащите сюда заголовок колонки для группировки по этой колонке.",
        ngSearchPlaceHolder: "Искать...",
        ngMenuText: "Выберите столбцы:",
        ngShowingItemsLabel: "Показаны записи:",
        ngTotalItemsLabel: "Всего записей:",
        ngSelectedItemsLabel: "Выбранные записи:",
        ngPageSizeLabel: "Строк на странице:",
        ngPagerFirstTitle: "Первая страница",
        ngPagerNextTitle: "Следующая страница",
        ngPagerPrevTitle: "Предыдущая страница",
        ngPagerLastTitle: "Последняя страница"
    }, e.ngGrid.i18n["zh-cn"] = {
        ngAggregateLabel: "条目",
        ngGroupPanelDescription: "拖曳表头到此处以进行分组",
        ngSearchPlaceHolder: "搜索...",
        ngMenuText: "数据分组与选择列：",
        ngShowingItemsLabel: "当前显示条目：",
        ngTotalItemsLabel: "条目总数：",
        ngSelectedItemsLabel: "选中条目：",
        ngPageSizeLabel: "每页显示数：",
        ngPagerFirstTitle: "回到首页",
        ngPagerNextTitle: "下一页",
        ngPagerPrevTitle: "上一页",
        ngPagerLastTitle: "前往尾页"
    }, e.ngGrid.i18n["zh-tw"] = {
        ngAggregateLabel: "筆",
        ngGroupPanelDescription: "拖拉表頭到此處以進行分組",
        ngSearchPlaceHolder: "搜尋...",
        ngMenuText: "選擇欄位：",
        ngShowingItemsLabel: "目前顯示筆數：",
        ngTotalItemsLabel: "總筆數：",
        ngSelectedItemsLabel: "選取筆數：",
        ngPageSizeLabel: "每頁顯示：",
        ngPagerFirstTitle: "第一頁",
        ngPagerNextTitle: "下一頁",
        ngPagerPrevTitle: "上一頁",
        ngPagerLastTitle: "最後頁"
    }, angular.module("ngGrid").run(["$templateCache", function(e) {
        e.put("aggregateTemplate.html", '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate">\r\n    <span class="ngAggregateText">{{row.label CUSTOM_FILTERS}} ({{row.totalChildren()}} {{AggItemsLabel}})</span>\r\n    <div class="{{row.aggClass()}}"></div>\r\n</div>\r\n'), e.put("cellEditTemplate.html", '<div ng-cell-has-focus ng-dblclick="CELL_EDITABLE_CONDITION && editCell()">\r\n	<div ng-edit-cell-if="!(isFocused && CELL_EDITABLE_CONDITION)">	\r\n		DISPLAY_CELL_TEMPLATE\r\n	</div>\r\n	<div ng-edit-cell-if="isFocused && CELL_EDITABLE_CONDITION">\r\n		EDITABLE_CELL_TEMPLATE\r\n	</div>\r\n</div>\r\n'), e.put("cellTemplate.html", '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD CUSTOM_FILTERS}}</span></div>'), e.put("checkboxCellTemplate.html", '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>'), e.put("checkboxHeaderTemplate.html", '<input class="ngSelectionHeader" type="checkbox" ng-show="multiSelect" ng-model="allSelected" ng-change="toggleSelectAll(allSelected, true)"/>'), e.put("editableCellTemplate.html", '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" />'), e.put("footerTemplate.html", '<div ng-show="showFooter" class="ngFooterPanel" ng-class="{\'ui-widget-content\': jqueryUITheme, \'ui-corner-bottom\': jqueryUITheme}" ng-style="footerStyle()">\r\n    <div class="ngTotalSelectContainer" >\r\n        <div class="ngFooterTotalItems" ng-class="{\'ngNoMultiSelect\': !multiSelect}" >\r\n            <span class="ngLabel">{{i18n.ngTotalItemsLabel}} {{maxRows()}}</span><span ng-show="filterText.length > 0" class="ngLabel">({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span>\r\n        </div>\r\n        <div class="ngFooterSelectedItems" ng-show="multiSelect">\r\n            <span class="ngLabel">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span>\r\n        </div>\r\n    </div>\r\n    <div class="ngPagerContainer" style="float: right; margin-top: 10px;" ng-show="enablePaging" ng-class="{\'ngNoMultiSelect\': !multiSelect}">\r\n        <div style="float:left; margin-right: 10px;" class="ngRowCountPicker">\r\n            <span style="float: left; margin-top: 3px;" class="ngLabel">{{i18n.ngPageSizeLabel}}</span>\r\n            <select style="float: left;height: 27px; width: 100px" ng-model="pagingOptions.pageSize" >\r\n                <option ng-repeat="size in pagingOptions.pageSizes">{{size}}</option>\r\n            </select>\r\n        </div>\r\n        <div style="float:left; margin-right: 10px; line-height:25px;" class="ngPagerControl" style="float: left; min-width: 135px;">\r\n            <button type="button" class="ngPagerButton" ng-click="pageToFirst()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerFirstTitle}}"><div class="ngPagerFirstTriangle"><div class="ngPagerFirstBar"></div></div></button>\r\n            <button type="button" class="ngPagerButton" ng-click="pageBackward()" ng-disabled="cantPageBackward()" title="{{i18n.ngPagerPrevTitle}}"><div class="ngPagerFirstTriangle ngPagerPrevTriangle"></div></button>\r\n            <input class="ngPagerCurrent" min="1" max="{{currentMaxPages}}" type="number" style="width:50px; height: 24px; margin-top: 1px; padding: 0 4px;" ng-model="pagingOptions.currentPage"/>\r\n            <span class="ngGridMaxPagesNumber" ng-show="maxPages() > 0">/ {{maxPages()}}</span>\r\n            <button type="button" class="ngPagerButton" ng-click="pageForward()" ng-disabled="cantPageForward()" title="{{i18n.ngPagerNextTitle}}"><div class="ngPagerLastTriangle ngPagerNextTriangle"></div></button>\r\n            <button type="button" class="ngPagerButton" ng-click="pageToLast()" ng-disabled="cantPageToLast()" title="{{i18n.ngPagerLastTitle}}"><div class="ngPagerLastTriangle"><div class="ngPagerLastBar"></div></div></button>\r\n        </div>\r\n    </div>\r\n</div>\r\n'), e.put("gridTemplate.html", '<div class="ngTopPanel" ng-class="{\'ui-widget-header\':jqueryUITheme, \'ui-corner-top\': jqueryUITheme}" ng-style="topPanelStyle()">\r\n    <div class="ngGroupPanel" ng-show="showGroupPanel()" ng-style="groupPanelStyle()">\r\n        <div class="ngGroupPanelDescription" ng-show="configGroups.length == 0">{{i18n.ngGroupPanelDescription}}</div>\r\n        <ul ng-show="configGroups.length > 0" class="ngGroupList">\r\n            <li class="ngGroupItem" ng-repeat="group in configGroups">\r\n                <span class="ngGroupElement">\r\n                    <span class="ngGroupName">{{group.displayName}}\r\n                        <span ng-click="removeGroup($index)" class="ngRemoveGroup">x</span>\r\n                    </span>\r\n                    <span ng-hide="$last" class="ngGroupArrow"></span>\r\n                </span>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <div class="ngHeaderContainer" ng-style="headerStyle()">\r\n        <div ng-header-row class="ngHeaderScroller" ng-style="headerScrollerStyle()"></div>\r\n    </div>\r\n    <div ng-grid-menu></div>\r\n</div>\r\n<div class="ngViewport" unselectable="on" ng-viewport ng-class="{\'ui-widget-content\': jqueryUITheme}" ng-style="viewportStyle()">\r\n    <div class="ngCanvas" ng-style="canvasStyle()">\r\n        <div ng-style="rowStyle(row)" ng-repeat="row in renderedRows" ng-click="row.toggleSelected($event)" ng-class="row.alternatingRowClass()" ng-row></div>\r\n    </div>\r\n</div>\r\n<div ng-grid-footer></div>\r\n'), e.put("headerCellTemplate.html", '<div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !col.noSortVisible() }">\r\n    <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div>\r\n    <div class="ngSortButtonDown" ng-click="col.sort($event)" ng-show="col.showSortButtonDown()"></div>\r\n    <div class="ngSortButtonUp" ng-click="col.sort($event)" ng-show="col.showSortButtonUp()"></div>\r\n    <div class="ngSortPriority">{{col.sortPriority}}</div>\r\n    <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div>\r\n</div>\r\n<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>\r\n'), e.put("headerRowTemplate.html", '<div ng-style="{ height: col.headerRowHeight }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngHeaderCell">\r\n	<div class="ngVerticalBar" ng-style="{height: col.headerRowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>\r\n	<div ng-header-cell></div>\r\n</div>'), e.put("menuTemplate.html", '<div ng-show="showColumnMenu || showFilter"  class="ngHeaderButton" ng-click="toggleShowMenu()">\r\n    <div class="ngHeaderButtonArrow"></div>\r\n</div>\r\n<div ng-show="showMenu" class="ngColMenu">\r\n    <div ng-show="showFilter">\r\n        <input placeholder="{{i18n.ngSearchPlaceHolder}}" type="text" ng-model="filterText"/>\r\n    </div>\r\n    <div ng-show="showColumnMenu">\r\n        <span class="ngMenuText">{{i18n.ngMenuText}}</span>\r\n        <ul class="ngColList">\r\n            <li class="ngColListItem" ng-repeat="col in columns | ngColumns">\r\n                <label><input ng-disabled="col.pinned" type="checkbox" class="ngColListCheckbox" ng-model="col.visible"/>{{col.displayName}}</label>\r\n				<a title="Group By" ng-class="col.groupedByClass()" ng-show="col.groupable && col.visible" ng-click="groupBy(col)"></a>\r\n				<span class="ngGroupingNumber" ng-show="col.groupIndex > 0">{{col.groupIndex}}</span>          \r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>'), e.put("rowTemplate.html", '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}">\r\n	<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div>\r\n	<div ng-cell></div>\r\n</div>')
    } ])
})(window, jQuery);