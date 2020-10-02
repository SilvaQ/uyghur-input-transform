# uyghur-input-transform

this library transform input character to uyghur

# شىرخان ئېلىپبە جەدىۋىلى
> how is Hemze?
>
ئ‍  ~**ih || ki**~  测试结果表明不能使用已存在的字母可以组合生成的任何一组字母 比如 kitab,ihtimal 和这两个字母重叠了 所以不能这样使用
>

ئ‍ ic? || ci ?


ئا a

ئە e

ئې **ei**

ئى i

ئو o

ئۇ u

ئۆ **ov**

ئۈ **oi**

---

ب b

د d

گ g

ج j

ل l

م m

ن n

ر r

ۋ w

ي y

ز z

غ **gh**

ژ **rh**

ڭ **ng**

ھ **h**

---

پ p

ت t

چ **ch**


س s ? || ~c?~ 

خ **kh**
ش x

ف f

ق q

ك k

# چىگىرىلالاش بەلگىسى

"/" chigirilash belgisi qilinip ishlitilidu.
yeni,mezmun arisida /你好/ weyaki /hello world/ digendek ipadige yuluqqanda "/" din bashlinip yene bir "/" giche bolghan da iridiki barliq mezmunlar esli peti saqlinip uyghurche kod almashturushqa qatnashmaydu .



--- 

# uighur alphabet unicode to extends Mappings rule (from sherer [elshat])

<p dir="rtl">
1.
ھەرپ سانى بىر بولغاندا بىرىنچى ھەرپنىڭ يالغۇز شەكلى كىلىدۇ.
</p>
<p dir="rtl">
2.
  ھەرپ سانى بىردىن چوڭ بولغاندا، بىرىنچى ھەرپنىڭ باش يىزىلىشى كېلىدۇ.
</p>
<p dir="rtl">
3.  ئارلىقتىكى ھەرپنىڭ ئالدىدىكى ھەرپ بەلگىسى 0 بولسا باش يىزىلىشى كېلىدۇ.
</p>
<p dir="rtl">
4.  ئارلىقتىكى ھەرپنىڭ ئالدىدىكى ھەرپ بەلگىسى 1 بولسا ئوتتۇرىدا يىزىلىشى كېلىدۇ.
</p>
<p dir="rtl">
5.  ئاخىرقى ھەرپنىڭ ئالدىدىكى ھەرپ بەلگىسى 0 بولسا يالغۇز شەكلى كېلىدۇ.
</p>
<p dir="rtl">
6.  ئاخىرقى ھەرپنىڭ ئالدىدىكى ھەرپ بەلگىسى 1 بولسا ئاخىرقى يىزىلىشى كېلىدۇ.
</p>
<p dir="rtl">
7.  ئاخىرىدا بارلىق لا(ئىككى خىل شەكلى بار) كىڭەيتىلگەن لا(ئىككى خىل شەكلى بار)غا ئالماشتۇرىمىز.
</p>
