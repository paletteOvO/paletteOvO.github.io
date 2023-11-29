---
title: "一個用python寫的lisp解釋器"
pub_date: 2017-04-01
tags: []
categories: Programming
---

這裡是一個年更blog主_(:3」∠)_

嘛這個語言是以全局只用一個map/dict, 但支援閉包為目標做的

<!-- more -->

這個語言長這樣

```scheme
(def x 1)
(print ((fn (y) x) 1)) ; print 1
(set x (lazy (do (print "x") 2))) ; 延時求值, 不可重複定義
x ; print "x", return 2
x ; return 2
(def (f) x)
(def (g x) (f))
(g 1) ; return 2, 閉包
(def (k ...) (apply + ...)) ; 可變長參數
(k 1 2 3) ; return 6
(def (f1 $expr) (do (print "f1") (eval expr))) ; fexpr
(f1 (print "f1,2")) ; print "f1", print "f1,2"
(def define def) ; 一切東西都是函數
(define lambda fn)
(define Y (lambda (f)
           ((lambda (u) (u u))
            (lambda (g)
                (f (lambda (x) ((g g) x)))))))
((Y (lambda (f)
        (lambda (x)
            (if (= x 0)
                1
                (* x (f (- x 1)))))))
 5) ; return 120
(eval '(print "\n")) ; print new line ; Quote
(+ 0.1 0.2) ; return 0.30000000000000004 ;)
(def (pwr b p) ; 快速幂
  (do
    (def ans 1)
    (while (!= p 0)
           (do
             (if (= (& p 1) 1) ; 位運算
                 (set ans (* ans b))
                 )
             (set b (* b b))
             (set p (shr p 1))
             )
           )
    ans
    )
  )
(pwr 3 6) ; return 729
;快排
  (def (quicksort lst)
    (if (= (. lst __len__) 0)
        '()
        (let ([frist (. lst __getitem__ 0)]
             [rest (split lst 1)])
    (+ (quicksort (filter (fn (x) (< x frist)) rest))
       '(,(do frist))
       (quicksort (filter (fn (x) (>= x frist)) rest)))
    )
  ))
(quicksort '(5 4 46 465 1 8 58 5 41 81 6 84 1 8))
; return '(1, 1, 4, 5, 5, 6, 8, 8, 41, 46, 58, 81, 84, 465)
```


語法大概就長這個樣子, 功能上面也說得差不多了, 說說技術細節..

思路就是,

根作用域是一個None

每多一層作用域, 就把一個全局變量scopeID加1, 而下一層作用域就會是(scopeID, scope), 組成一個鏈表表示作用域篏套

而儲存/讀取變量時用作用域來識別要取的變量

函數閉包就直接保存作用域鏈表, 要儲存/讀取變量時, 直接用鏈表就可以讀取到創建環境的變量了

雖然但是, 這方法不能防止在外部變量改變時，閉包變量也會改變，類似 copy by reference 但我在scheme下測試

```
(define x 1)
(define (f) x)
(define x 2)
```

(f) 是回傳 2 的…所以大概也不是甚麼大問題
